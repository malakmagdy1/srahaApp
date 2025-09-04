import { userModel } from "./models/user_model.js"

export const FindOne=async({model,filter={}})=>{
    const doc=await model.findOne(filter)
    return doc
}

export const FindById=async({model,id})=>{
    const doc=await model.findById(id)
    return doc
}
export const create=async({model,data})=>{
    const docs=await model.doc(data)
    return docs
}
export const FinByEmail=async(email)=>{
    const doc=await userModel.findOne({email})
    return doc
}