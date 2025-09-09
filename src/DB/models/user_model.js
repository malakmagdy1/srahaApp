import mongoose, { Schema, model } from "mongoose";

// Enum for gender
export const Gender = {
  male: "male",
  female: "female",
};
Object.freeze(Gender);

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
    emailotp: {
      otp: { type: String },
      expiredAt: { type: Date },
      failedAttempts:{ type: Number, default:0 },
      banExpiresAt: { type: Date, default:null },
    },
    passotp: {
      otp: { type: String },
      expiredAt: { type: Date },
    },
  },
  { timestamps: true }
);

export const userModel = model("User", userSchema);
