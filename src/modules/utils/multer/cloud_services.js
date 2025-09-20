import cloudinary from "./cloudConfig.js"

export const uploadSingleFile=async({path,dest=""})=>{
 const{secure_url,public_id}= await cloudinary.uploader.upload(path,{
  folder:`${process.env.CLOUD_FOLDER}/${dest}`
})
return {secure_url,public_id}
}
export const destroySingleFile=async({public_id})=>{
    await cloudinary.uploader.destroy(public_id)
}
export const uploadMultiFiles=async({paths=[],dest=''})=>{
  if(paths.length==0){
    throw new Error("no fiels exist")
  }
  const images=[]
for(const path of paths){
  const {public_id,secure_url}=await uploadSingleFile({path,dest:`${process.env.CLOUD_FOLDER}/${dest}`})
images.push({public_id,secure_url})
}
return images
}