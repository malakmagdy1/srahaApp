import joi from "joi";
import { Gender } from "../../DB/models/user_model.js";
import { fileTypes } from "./multer/multer.js";
export const generalValidation = {
  email: joi.string().email(),
  password: joi.string().min(6).max(20),
  confirmPass: joi.string().valid(joi.ref("password")), //to make confirm password =password
  phone: joi.string().regex(/^(\+20|0020|0?)(1)([0125])\d{8}$/),
  name: joi.string(),
  gender: joi.string().valid(Gender.female, Gender.male),
  age: joi.number(),
  role: joi.string(),
  otp: joi.string().min(6).max(10),
  fieldname: joi.string().required(),
  originalname: joi.string().required(),
  encoding: joi.string().required(),
  mimetype: joi
    .string()
    .valid(...fileTypes.image)
    .required(),
  destination: joi.string().required(),
  filename: joi.string().required(),
  path: joi.string().required(),
  size: joi
    .number()
    .max(5 * 1024 * 1024)
    .required(),
};
