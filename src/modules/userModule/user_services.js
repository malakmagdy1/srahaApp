import { userModel } from "../../DB/models/user_model.js";
import { decryption } from "../utils/crypto.js";
import { NotValidEmailException } from "../utils/exceptions.js";
import { successHandler } from "../utils/successhandler.js";
import fs from 'fs/promises'
import { destroySingleFile, uploadMultiFiles, uploadSingleFile } from "../utils/multer/cloud_services.js";
import cloudinary from "../utils/multer/cloudConfig.js";


export const getUserProfile = async (req, res, next) => {
  const id=req.params.id
  const user=await userModel.findOne({_id:id,isDeleted:false}).select("name email phone profileImage")
  if(!user){
    next (new NotValidEmailException() )  
  }
  return successHandler({res,data:user})
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

export const shareProfile=async(req,res,next)=>{
const user=req.user
const link=`${req.protocol}://${req.host}/user/${user._id}`
return successHandler({res,data:link})
}
export const softDelete = async (req, res,next) => {
  const { id } = req.params;
const user = await userModel.findOne({ _id: id, isDeleted: false });
        if (!user) {
      return next(new Error("User not found or already deleted"));
    }
    if(user.role=='admin'){
      throw new Error("admin can't be deleted ")
    }
  user.isDeleted = true;
  user.DeletedBy = req.user._id;
  await user.save()
  return successHandler({res})
};

export const restoreAccount=async(req,res)=>{
  const id=req.params.id
  const user=await userModel.findById(id)
  if(!user){
    throw new NotValidEmailException
  }
  if(!user.isDeleted){
throw new Error('user not deleted')
  }
if (user.DeletedBy.toString() !== req.user._id.toString()) {
  throw new Error("user not deleted");
}

user.isDeleted=false
  await user.save()
return successHandler({res,data:user})
}
export const hardDelete=async(req,res)=>{
const  user=req.user
  await user.deleteOne()
  return successHandler({res})
}

export const profileImage=async(req,res,next)=>{
 const user=req.user
 const oldpic=user.profileImage?.public_id
 const{secure_url,public_id}= await uploadSingleFile({path:req.file.path,dest:`users/${user.id}/profile_images`})

 if(oldpic){
  await destroySingleFile({ public_id: oldpic })
 }
  // const path=`${req.file.destination}/${req.file.filename}`
  // if(user.profileImage){
  //   await fs.unlink(path)
  // }
  // user.profileImage=path
   user.profileImage={secure_url,public_id}
   await user.save()
  successHandler({res})
}
export const coverImage=async(req,res,next)=>{
  const user=req.user
  const files=req.files
  const paths=[]
  req.files.map(file=>{paths.push(file.path)})
  const coverImages=await uploadMultiFiles({paths,dest:`users/${user.id}/cover_images`})
  user.coverImages.push(...coverImages)
  await user.save()
  successHandler({res,user})
}