import { Router } from "express";
import { confirmationEmail, forgetpass, getUserProfile, login, refreshTokenn, reSendOtp, signup } from "./auth_services.js";
import { auth } from "../../DB/middleware/auth_middleware.js";
import { validation } from "../../DB/middleware/validation_middleware.js";
import { loginSchema } from "./auth_validation.js";
const Authroute = Router();
Authroute.post("/signup", signup);
Authroute.post("/login", validation(loginSchema),login);
Authroute.get("/profile",auth(),getUserProfile);
Authroute.post("/refresh",refreshTokenn)
Authroute.post("/otp",confirmationEmail)
Authroute.post("/reotp",reSendOtp)
Authroute.post("/repass",forgetpass)

export default Authroute;
