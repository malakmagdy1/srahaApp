import connectDB from "./DB/connection.js"
import Authroute from "./modules/authModule/auth_controller.js"
import messageRoute from "./modules/messageModule/message_controller.js"
import Userroute from "./modules/userModule/user_controller.js"
import { NotFoundUrlException } from "./modules/utils/exceptions.js"

const bootStrap=async(app,express)=>{
    const port=process.env.PORT
    app.use(express.json())
    await connectDB() //to connect before server run put await
app.use("/auth",Authroute)
app.use("/message",messageRoute)
app.use("/user",Userroute)

app.all("{/*s}",(req,res,next)=>{
    return next(new NotFoundUrlException())
})

app.use((err,req,res,next)=>{
    console.log(err.stack) 
    res.status(err.cause||500).json({
        errMsg:err.message||"Internal server error",
        status:err.cause||500
    })
})

app.listen(port,()=>{
    console.log("server running")
})
}
export default bootStrap