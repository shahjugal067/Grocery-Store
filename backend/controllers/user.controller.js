import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import createToken from '../utils/createToken.js'

export const signUpUser = async(req ,res ) => {
    const { username,email,password } = req.body;

    if(!username || !email || !password){
        res.status(400).json({ message: "Please provide all fields"})
    }
    const userExist = await User.findOne({email})
    if(userExist)
        res.status(400).json({ message: "User already exist"})

    const salt = await bcryptjs.genSalt(10)

    const hashPassword = await bcryptjs.hash(password,salt)
    
    const newUser = new User({username,email,password:hashPassword})
    
    try {
        await newUser.save()
        createToken(res,newUser._id);
        
        res.status(200).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error"})
    }
   

};

export const loginUser = async(req ,res)=>{
    const { email, password }= req.body;

    const existingUser = await User.findOne({email});

    if(existingUser){
        const isPasswordValid = await bcryptjs.compare(password,existingUser.password)

        if(isPasswordValid){
            createToken(res,existingUser._id)

            res.status(200).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin,
            });
            return 
        }
    }
};

export const logoutUser = async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "logout success"})
};

export const getAllUsers = async (req,res) => {
    const users = await User.find({});
    res.status(200).json(users)
};

export const getUserProfile = async(req,res) => {
    const user = await User.findById(req.user._id);
    if(user){
        res.status(200).json({
            _id:user._id,
            username: user.username,
            email: user.email,
        });
    }else{
        res.status(404).json({ message: " user not found"})
    }
    
};

export const updateUserProfile = async(req,res)=>{
    const user = await User.findById(req.user._id);

    if(user){
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        if(req.body.password){
            const salt = await bcryptjs.genSalt(10)

            const hashPassword = await bcryptjs.hash(req.body.password,salt)
            user.password = hashPassword
        }
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
             email: updatedUser.email,
             isAdmin: updatedUser.isAdmin,
        });
    }else{
        res.status(404).json({ message:" User not found "})
    }
};

export const deleteUser = async(req,res)=>{
    const user = await User.findById(req.params.id)

    if(user){
        if(user.isAdmin){
            res.status(400).json({ message: "Can't delete the admin user"})
        }
        await User.deleteOne({_id:user._id})
        res.status(200).json({ message:"user deleted"})
    }
};

export const getUserById = async(req,res)=>{
    const user = await User.findById(req.params.id).select('-password')

    if(user){
        res.json(user)
    }else{
        res.status(404).json({ message:" user not found "})
    }
};
export const updateUserById = async (req,res)=>{
    const user = await User.findById(req.params.id)

    if(user){
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin || user.isAdmin

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    }else{
        res.status(404).json({ message:"User not found" })
    }
};