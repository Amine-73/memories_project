import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import user from "../models/user";

export const signin=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const existingUser=await user.findOne({email});
        if(!existingUser) return res.status(404).json({message:"User Doesn't exist."});
        const existignPassword=await bcrypt.compare(password,existingUser.password);
        if(!existignPassword) return res.status(400).json({message:' Invalid Password '})
        const token=jwt.sign({email:existingUser,id:existingUser._id},'test',{expiresIn:'1h'})
        res.status(200).json({result:existingUser,token})
    } catch (error) {
        res.status(500).json({message:'Something went wrong'})
    }
}
export const signup=async(req,res)=>{
    const {email,password,confirmPassword,firstName,lastName}=req.body;
    try {
        const existingUser=await user.findOne({email});
        if(existingUser) return res.status(400).json({message:'Already exist this email'});
        if(password!==confirmPassword)return res.status(404).json({message:'Password Invalid'})
        const pswHash=await bcrypt.hash(password,12);
        const result=user.create({email,password,pswHash,name:`${firstName} ${lastName}`})
        const token=jwt.sign({email:result.email,id:result._id},'test',{expiresIn:'1h'})
        res.status(200).json({result,token})
    } catch (error) {
        res.status(500).json({message:'Something went wrong'})
    }
}