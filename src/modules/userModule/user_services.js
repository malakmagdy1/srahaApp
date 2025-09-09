import { decryption } from "../utils/crypto.js";
import { successHandler } from "../utils/successhandler.js";

export const getUserProfile = async (req, res, next) => {
  const user = req.user;
  req.user.phone = decryption(user.phone);
  successHandler({ res, data: user });
};

export const updateBasicInfo=async(req,res,next)=>{
  const {name,age,phone}=req.body
  const user=req.user
  user.age=age||user.age
  user.name=name||  user.name
  user.phone=phone|| user.phone
  await user.save()
  return successHandler({res})
}