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