import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './route/user.route.js'
import authRouter from './route/auth.route.js'

dotenv.config()
mongoose.connect(process.env.MONGO_PASS).then(()=>{
    console.log("Connected to db");
}).catch((err)=>{
    console.log(err);
})
 const app=express();
app.use(express.json())

  app.listen(3000,()=>{
console.log("Server is successfully running on 3000");
  })
 app.use('/api/user/',userRouter)
 app.use('/api/auth',authRouter)

 app.use((err,req,res,next)=>{
  const statusCode=err.statusCode || 500;
  const message=err.message || "Internal server error";
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message,
  })
 })