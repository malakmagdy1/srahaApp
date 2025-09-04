import joi from "joi";
export 
      const loginSchema=joi.object().keys({
        email:joi.string().email().required(),
        password:joi.string().min(6).max(20).required()
      })
    