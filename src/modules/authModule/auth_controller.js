import { Router } from "express";
import { confirmationEmail, forgetpass, login, refreshTokenn, reSendOtp, signup } from "./auth_services.js";
import { validation } from "../../DB/middleware/validation_middleware.js";
import { confirmEmailScema, loginSchema, reSendOtpSchema, signupSchema } from "./auth_validation.js";
const Authroute = Router();
Authroute.post("/signup", validation(signupSchema),signup);
Authroute.post("/login", validation(loginSchema),login);
Authroute.post("/refresh",refreshTokenn)
Authroute.post("/otp",validation(confirmEmailScema),confirmationEmail)
Authroute.post("/reotp",validation(reSendOtpSchema),reSendOtp)
Authroute.post("/repass",forgetpass)

export default Authroute;
