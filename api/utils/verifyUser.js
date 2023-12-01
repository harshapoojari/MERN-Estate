import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken=(req,res,next)=>{
const token=req.cookie.access_token;
if(!token) return next(errorHandler(401,"Unauthrized"));
 jwt.verify(token,process.env.JWT_TOKEN,(err,user)=>{
        if(err) return next(errorHandler(403,'Forbidden'));
        req.user=user;
        next();

 })
}