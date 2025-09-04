import { FinByEmail, FindOne } from "../../DB/DBservices.js";
import { decoeToken, tokenTypes } from "../../DB/middleware/auth_middleware.js";
import { userModel } from "../../DB/models/user_model.js";
import {
  ConfirmEmail,
  InvalidOtp,
  InvalidTokenException,
  NotFoundUrlException,
  NotValidEmailException,
  NotValidPassException,
} from "../utils/exceptions.js";
import { successHandler } from "../utils/successhandler.js";
import jwt from "jsonwebtoken";
import { decryption, encryption } from "../utils/crypto.js";
import { hash } from "../utils/hash.js";
import { compareSync } from "bcrypt";
import { template } from "../utils/sendemail/generateHTML.js";
import { nanoid, customAlphabet } from "nanoid";
import { sendEmail } from "../utils/sendemail/sendEmail.js";


export const signup = async (req, res, next) => {
  const { name, email, password, age, gender, role, phone } = req.body;
  const isExist = await FindOne({ model: userModel, filter: { email } });
  if (isExist) {
    next(new NotValidEmailException());
  }

  const custom = customAlphabet("0123456789"); //custom number
  const otp = custom(6);
  const html = template(otp, name, "email confirmation");

  const user = await userModel.create({
    name,
    email,
    password: hash(password),
    age,
    gender,
    role,
    phone: encryption(phone),
    emailotp: { otp: hash(otp), expiredAt: Date.now() + 1000 * 60 },
  });
  await sendEmail(user.email, "email confirmation", html);
  return successHandler({ res, data: user, status: 201 });
};

export const reSendOtp = async (req, res, next) => {
  const { email } = req.body;
  const data = await FinByEmail(email);
  if (!data) {
    throw new NotValidEmailException();
  }
  if (data.emailotp.expiredAt > Date.now()) {
    throw new Error("use last sended otp");
  }
  if (data.confirmed) {
    throw new Error("already confirmed");
  }
  const custom = customAlphabet("0123456789"); //custom number
  const otp = custom(6);
  const html = template(otp, data.name, "email confirmation");

  await sendEmail(data.email, "re send otp", html);
  await userModel.updateOne({
    emailotp: { otp: hash(otp), expiredAt: Date.now() + 1000 * 60 },
  });
  successHandler({ res });
};

export const forgetpass = async (req, res, next) => {
  const { email } = req.body;
  const user = await FinByEmail(email);
  if (!user) {
    throw new NotValidEmailException();
  }
  const custom = customAlphabet("0123456789"); //custom number
  const otp = custom(6);
  const html = template(otp, user.name, "forget pass");

  await sendEmail(user.email, "forget pass", html);
  await userModel.updateOne({
    passotp: { otp: hash(otp), expiredAt: Date.now() + 1000 * 60 },
  });
  successHandler({ res });
};

export const changepass = async (req, res, next) => {
  const { email, otp, password } = req.body;
  const user = await FinByEmail(email);
  if (!user) {
    throw new NotValidEmailException();
  }
  if (!user.passotp.otp) {
    throw new Error("no otp exist");
  }
  if (user.passotp.expiredAt <= Date.now()) {
    throw new InvalidOtp();
  }
  if (!compareSync(otp, user.passotp.otp)) {
    throw new InvalidOtp();
  }
  await user.updateOne({
    pass: password,
    $unset: {
      passotp: "",
    },changedCredentialAt:Date.now()
  }),
    successHandler({ res });
};

export const confirmationEmail = async (req, res, next) => {
  const { otp, email } = req.body;
  const user = await FinByEmail(email);
  if (!user) {
    throw new NotValidEmailException();
  }
  if (user.emailotp.expiredAt <= Date.now()) {
    throw new InvalidOtp();
  }
  if (!compareSync(otp, user.emailotp.otp)) {
    throw new InvalidOtp();
  }
  await user.updateOne({ confirmed: true, $unset: { emailotp: "" } });
  return successHandler({ res });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await FindOne({ model: userModel, filter: { email } });
  if (!user) {
    return next(new NotValidEmailException());
  }
  if (!compareSync(password, user.password)) {
    return next(new NotValidPassException());
  }
  if (!user.confirmed) {
    return next(new ConfirmEmail());
  }
  const accesstoken = jwt.sign(
    { _id: user._id },
    process.env.ACCESS_SEGNATURE,
    { expiresIn: "20 s" }
  );
  const refreshtoken = jwt.sign(
    { _id: user._id },
    process.env.REFRESH_SEGNATURE,
    { expiresIn: "7 D" }
  );

  //const decode=jwt.verify(token,'malak'  )
  return successHandler({
    res,
    data: { accesstoken, refreshtoken },
    status: 200,
  });
};

export const getUserProfile = async (req, res, next) => {
  const user = req.user;
  req.user.phone = decryption(user.phone);
  successHandler({ res, data: user });
};

export const refreshTokenn = async (req, res, next) => {
  const { refreshtoken } = req.body;
  const user = await decoeToken({
    token: refreshtoken,
    type: tokenTypes.refresh,
  });
  const accesstoken = jwt.sign(
    {
      _id: user._id,
    },
    process.env.ACCESS_SEGNATURE,
    {
      expiresIn: "30 S",
    }
  );
  return successHandler({
    res,
    data: {
      accesstoken,
    },
  });
};
