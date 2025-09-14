import {Router} from 'express';
import { getUserProfile, hardDelete, restoreAccount, shareProfile, softDelete, updateBasicInfo } from './user_services.js';
import { allowTo, auth } from '../../DB/middleware/auth_middleware.js';
import { getUserSchema, updateBasicInfoSchema } from './user_validation.js';
import { validation } from "../../DB/middleware/validation_middleware.js";

const Userrouter=Router()

Userrouter.get("/profile/:id",validation(getUserSchema),getUserProfile);
Userrouter.patch("/update",validation(updateBasicInfoSchema),updateBasicInfo)
Userrouter.get("/share",auth(),shareProfile)
Userrouter.patch("/softdelete/:id",auth(),allowTo('admin','user'),softDelete)
Userrouter.patch("/restore/:id",auth(),allowTo("admin",'user'),restoreAccount)
Userrouter.delete("/delete",auth(),hardDelete)
export default Userrouter