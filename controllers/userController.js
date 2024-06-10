import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../config/generateToken.js";


export const registerUser=asyncHandler(async (req,res)=>{
    const {name,email,password,pic}=req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please provide all fields");
    }

    const userExists=await User.findOne({email: email});
    if(userExists){
        res.status(400);
        throw new Error( "Email already in use");
    }
    const user=await User.create({
        name,
        email,
        password,
        pic
    });
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token : generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error("Failed to create User");
    }
});

export const authUser=asyncHandler(async(req,res)=>{
     const {email,password}=req.body;
     const user=await User.findOne({email:email});
     if(user && user.matchPassword(password)){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token : generateToken(user._id)
        })
     }else{
        res.status(400);
        throw new Error("User not detected in DB");
     }
})

// api/user?search=vinay
export const allUsers=(async(req,res)=>{
    const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
})