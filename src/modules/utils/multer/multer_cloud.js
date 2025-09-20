import multer, { diskStorage } from "multer";
export const fileTypesC={
  image:['image/jpeg','image/png'],
  video:['video/mp4']
}
export const uploadToCloud = (type=fileTypesC.image) => {
  const storage = diskStorage({

  });
  
  const fileFilter=(req,file,cb)=>{
if(!type.includes(file.mimetype)){
  return cb(new Error("in-valid file type"),false)
}cb (null,true)
  }
  return multer({ storage: storage ,fileFilter});
};


