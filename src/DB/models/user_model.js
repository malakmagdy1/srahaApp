import mongoose, { Schema, Types, model } from "mongoose";

// Enum for gender
export const Gender = {
  male: "male",
  female: "female",
};
Object.freeze(Gender);
const otpSchema=new Schema({
  otp:String,
  expiredAt:Date
},{_id:false})
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      required: true,
      enum: Object.values(Gender),
      default: Gender.female,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
    },
    changedCredentialAt:Date,
    confirmed: {
      type: Boolean,
      default: false,
    },
    isDeleted:{
type:Boolean,default:false
    },
    DeletedBy:{
type:Types.ObjectId,
ref:"user"
    },
    newEmailOtp:otpSchema,
    oldEmailOtp:otpSchema,
    emailotp:otpSchema,
    passotp: otpSchema,

  },
  { timestamps: true }
);

export const userModel = model("User", userSchema);
