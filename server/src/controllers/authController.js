import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const generateToken = (email) =>{
    return jwt.sign({id: email}, process.env.JWTSECRET, {expiresIn: "7d"});
};

const registerUser = async (req, res) => {
    try{
        const {name, email, password, role, profileImageUrl} = req.body;

        if(!name || !email || !password || !role){
            return res.status(400).json({msg: "Fill all the credentials!"});
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({msg: "User already exists!"});
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({name, email, password: hashedPassword, role, profileImageUrl});

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl
        })
    } catch(error){
        return res.status(500).json({msg: "Server error!", error: error.message});
    }
};

const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        
        if(!email || !password){
            return res.status(400).json({msg: "Fill all the credentials!"});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({msg: "Invalid email!"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({msg: "Invalid password!"});
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user.email),
        })
    } catch(error){
        res.status(500).json({msg: "Server error!", error: error.message});
    }
}

export {loginUser, registerUser};