import CryptoJS from "crypto-js";
export const encryption=(text)=>{
    return CryptoJS.AES.encrypt(text,process.env.CRYPTOJS_SECRET).toString()
}

export const decryption=(text)=>{
    return CryptoJS.AES.decrypt(text,process.env.CRYPTOJS_SECRET).toString(CryptoJS.enc.Utf8)
}