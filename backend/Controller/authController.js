const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



//register controller

const register =async (req,res)=>{
    try {
        const {username,email,password}=req.body;
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json({success:false,message:"Email already exists"})
        }
        const hashPassword = await bcrypt.hash(password,10)
        const newUser = await User.create({
            username,email,password:hashPassword
        })
        return res.status(201).json({success:true,message:"User registered successfully",data:newUser})
    } catch (error) {
        console.error("Error during registration:",error)
        return res.status(500).json({success:false,message:"Internal server error",error:error.message})
    }
}

//login controller

const login = async (req,res) =>{
try {
    const {email,password}=req.body;
    if(!email ||  !password){
      return res.status(400).json({sucess:false,message:"Please Enter email and password"})

    }
    const user=await User.findOne({email})
    if(!user){
        return res.status(400).json({success:false,message:"User Not Found"})
    }

    const isMatch =await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({success:false,message:"Invalid Password"})
    }

    const token = jwt.sign({
        user_id:user._id,
    },process.env.JWT_SECRET,
    {expiresIn:"24h"}
    )
    res.status(200).json({success:true,data:{token,user}})

} catch (error) {
    console.error("Error during login:",error)
        return res.status(500).json({success:false,message:"Internal server error",error:error.message})
}
    
}

module.exports={register,login}