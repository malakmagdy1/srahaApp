import multer, { diskStorage } from "multer";
import { nanoid } from "nanoid";
import fs from'fs/promises';

export const fileTypes={
  image:['image/jpeg','image/png'],
  video:['video/mp4']
}
export const uploadFile = (folderName,type=fileTypes.image) => {
  const storage = diskStorage({
    destination:async(req,file,cb)=>{
const folder=`uploads/${folderName}/${req.user.name}`
await fs.access(folder).catch(async()=>{await fs.mkdir(folder,{recursive:true})})
cb(null,folder) 
    },
    // destination: "uploads", //make folder name uploads to save in it files 
    filename: (req, file, cb)=>{
    cb(null,`${nanoid(10)}_${file.originalname}`)} //to make the photo nme special 
  });
  const fileFilter=(req,file,cb)=>{
if(!type.includes(file.mimetype)){
  return cb(new Error("in-valid file type"),false)
}cb (null,true)
  }
  return multer({ storage: storage ,fileFilter});
};


