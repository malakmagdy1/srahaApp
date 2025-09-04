import {hashSync} from "bcrypt";
export const hash= (value)=>{
return hashSync(value,Number(process.env.BCRYPT_SALT_ROUND))
}