import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './route/user.route.js'


dotenv.config()
mongoose.connect(process.env.MONGO_PASS).then(()=>{
    console.log("Connected to db");
}).catch((err)=>{
    console.log(err);
})
 const app=express();
  app.listen(3000,()=>{
console.log("Server is successfully running on 3000");
  })
 app.use('/api/user/',userRouter)