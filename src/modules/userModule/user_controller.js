import {Router} from 'express';
import { coverImage, getUserProfile, hardDelete, profileImage, restoreAccount, shareProfile, softDelete, updateBasicInfo } from './user_services.js';
import { allowTo, auth } from '../../DB/middleware/auth_middleware.js';
import { getUserSchema, profileImageValidation, updateBasicInfoSchema } from './user_validation.js';
import { validation } from "../../DB/middleware/validation_middleware.js";
import { uploadFile } from '../utils/multer/multer.js';
import { uploadToCloud } from '../utils/multer/multer_cloud.js';

const Userrouter=Router()

Userrouter.get("/profile/:id",validation(getUserSchema),getUserProfile);
Userrouter.patch("/update",validation(updateBasicInfoSchema),updateBasicInfo)
Userrouter.get("/share",auth(),shareProfile)
Userrouter.patch("/softdelete/:id",auth(),allowTo('admin','user'),softDelete)
Userrouter.patch("/restore/:id",auth(),allowTo("admin",'user'),restoreAccount)
Userrouter.delete("/delete",auth(),hardDelete)
//Userrouter.patch("/upload-file",auth(),uploadFile("profileImage").single('profileImage'),validation(profileImageValidation),profileImage)
Userrouter.patch("/upload-file",auth(),uploadToCloud().single('profileImage'),validation(profileImageValidation),profileImage)
Userrouter.patch("/cover-image",auth(),uploadToCloud().array('coverImages'),coverImage)
export default Userrouter