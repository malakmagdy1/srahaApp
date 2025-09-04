export class NotFoundUrlException extends Error{
constructor(message){
    super("not found url",{cause:404})
}
}

export class NotValidEmailException extends Error{
    constructor(){
        super('not valid email',{cause:400})
    }
}
export class NotValidPassException extends Error{
    constructor(){
        super('not valid Pass',{cause:400})
    }
}

export class InvalidTokenException extends Error{
    constructor(){
        super ('invalid token please send it')
    }
}

export class InvalidOtp extends Error{
       constructor(){
        super ('invalid otp please send it')
    }
}
export class ConfirmEmail extends Error{
       constructor(){
        super ('confirm email first')
    }
}