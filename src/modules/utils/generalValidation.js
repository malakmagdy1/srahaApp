import joi from "joi";
import { Gender } from "../../DB/models/user_model.js";
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
};
