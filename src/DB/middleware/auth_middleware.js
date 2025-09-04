import jwt from "jsonwebtoken";
import { FindById } from "../DBservices.js";
import { userModel } from "../models/user_model.js";
import { InvalidTokenException } from "../../modules/utils/exceptions.js";
export const tokenTypes = {
  access: "access",
  refresh: "refresh",
};
Object.freeze(tokenTypes);

export const auth = () => {
  return async (req, res, next) => {
    const token = req.headers.auth;
    const user=await decoeToken({token,next})
            req.user = user;
    next();
  };
};

export const decoeToken = async ({ token, type = tokenTypes.access, next }) => {
  if (!token ) {
    return next(new InvalidTokenException());
  } //|| !token.startsWith('malak')
  let signature = process.env.ACCESS_SEGNATURE;
  if (type === tokenTypes.refresh) {
    signature = process.env.REFRESH_SEGNATURE;
  }
  const data = jwt.verify(token, signature);
  const user = await FindById({ model: userModel, id: data._id });
  if (!user) {
    throw new InvalidTokenException();
  }
  return user;
};
