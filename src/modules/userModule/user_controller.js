import {Router} from 'express';
import { getUserProfile, updateBasicInfo } from './user_services.js';
import { auth } from '../../DB/middleware/auth_middleware.js';
import { getUserSchema, updateBasicInfoSchema } from './user_validation.js';
import { validation } from "../../DB/middleware/validation_middleware.js";

const Userrouter=Router()

Userrouter.get("/profile",auth(),validation(getUserSchema),getUserProfile);
Userrouter.patch("/update",validation(updateBasicInfoSchema),updateBasicInfo)
export default Userrouter