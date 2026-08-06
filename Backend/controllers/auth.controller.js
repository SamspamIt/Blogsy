import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//Register Section 

export const registerUser = async (req, res)=>{
    try{
        const{name, email, password } = req.body;       // to register the user.


        if(!name || !email || !password ){
            return res.status(400).json({
                message:"All fields are required"
            });                //to check if fields are filled or not.
        }

        const existingUser = await User.findOne({email});   // check existing user , if any.
        if(existingUser){
            return res.status(400).json({
                message:"User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);   // to hash the passwords.
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "user",
        });

        const token = jwt.sign(
            { id: newUser._id, role: newUser.role},
            process.env.JWT_SECRET,
            {expiresIn: "7d" }
        );

        res.cookie("token", token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 1000 
        });

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email:newUser.email,
            role: newUser.role,
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

//Login Section 

export const loginUser = async (req, res)=>{
    try{
        const{ email, password }= req.body;

        if(!email || !password ){
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: user._id, 
                role: user.role
            },
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        res.cookie("token", token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

//Logout Section

export const logoutUser = (req, res)=>{
    res.clearCookie("token");
    res.status(200).json({
        message: "Logged out successfully"
    });
};

//Logged-In User

export const getMe = async(req, res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};