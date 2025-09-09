import joi from "joi";
import { generalValidation } from "../utils/generalValidation.js";
export const loginSchema = joi.object().keys({
  email:generalValidation.email.required(),
  password: generalValidation.password.required(),
});

export const signupSchema = joi.object().keys({
  email: generalValidation.email.required(),
  password:generalValidation.password.required(),
  confirmPass:generalValidation.confirmPass.required(), //to make confirm password =password 
  phone: generalValidation.phone.required(),
  name:generalValidation.name.required(),
  gender:generalValidation.gender,
  age:generalValidation.age,
  role:generalValidation.role
});

export const confirmEmailScema=joi.object().keys({
email:generalValidation.email.required(),
otp:generalValidation.otp.required()
})
export const reSendOtpSchema=joi.object().keys({
  email:generalValidation.email.required()
})