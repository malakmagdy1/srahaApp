// export const errorHandel=(fn)=>{
//     return (req,res,next)=>{
//         fn(req,res,next).catch(next (new Error(err.message,{cause:err.cause||500})))
//     }
// } for old version