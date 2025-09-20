import joi from "joi";
import mongoose from "mongoose";
import { generalValidation } from "../utils/generalValidation.js";


export const getUserSchema=joi.object({
    id:joi.string().custom((value,helpers)=>{
        if(mongoose.isValidObjectId(value)){
            return true
        }
        else{
            return helpers.message("invalid  object id ")
        }
    })
})
export const updateBasicInfoSchema=joi.object({
    name:generalValidation.name,
    age:generalValidation.age,
    phone:generalValidation.phone
})

export const profileImageValidation = joi.object({
  fieldname: generalValidation.fieldname, 
  originalname: generalValidation.originalname, 
  encoding: generalValidation.encoding, 
  mimetype:generalValidation.mimetype, 
  destination:generalValidation.destination,
  filename: generalValidation.fieldname, 
  path: generalValidation.path, 
  size: generalValidation.size
});