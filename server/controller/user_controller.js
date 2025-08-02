const bcrypt=require('bcryptjs')
const user=require('../models/user_schema')
const jwt=require('jsonwebtoken')
require('dotenv').config()


const signupUser=async (req,res)=>{
      try{
        const exists=await user.findOne({email:req.body.email})
        if(exists){
            return res.status(401).json({msg:'user already exists'})
        }
        const hashedPassword=await bcrypt.hash(req.body.password,10)
        const userData={...req.body,password:hashedPassword}
        const newUser= await user.create(userData)
        return res.status(200).json({msg:'registration successful',newUser})

      }catch(error){
        return res.status(500).json({msg:'error while creating a user'})
      }
}

const loginUser=async (req,res)=>{
    try{
      const exist= await user.findOne({email:req.body.email})
     if(!exist){
     return  res.status(401).json({msg:'invalid login'})
     }
     const isPasswordValid=await bcrypt.compare(req.body.password,exist.password)
     if(!isPasswordValid){
     return res.status(401).json({msg:'invalid login'})
     }
     
     const token=jwt.sign({ userId:exist._id,email:exist.email},process.env.JWT_SECRET_KEY,{expiresIn:'7d'})
      res.cookie('token',token,{
        httpOnly:true,
        maxAge:7 * 24 * 60 * 60 * 1000
      })
      return res.status(200).json({msg:'Login successful',user:{
        name:exist.name,
        email:exist.email
      }})

    }catch(error){
      return res.json({msg:'Error while logging in', error})
    }
}
const logoutUser=(req,res)=>{
  res.clearCookie('token',{
    httpOnly:true,
  })
  return res.status(200).json({ msg: 'Logged out successfully' });
}


const verifyUser= async (req,res)=>{
  const token=req.cookies.token;
  if (!token) {
            return res.status(401).json({ msg: 'No token provided' });
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
        const userData=await user.findById(decoded.userId)
         if (!userData) {
            return res.status(401).json({ msg: 'User not found' });
        }
         return res.status(200).json({
            user: {
                name: userData.name,
                email: userData.email,
                id: userData._id
            }
            })

}


module.exports={signupUser,loginUser,logoutUser,verifyUser};