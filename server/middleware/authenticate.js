const jwt=require('jsonwebtoken')
const user=require('../models/user_schema')
require('dotenv').config()

const authenticate=async(req,res,next)=>{
    try{

        const token=req.cookies.token;
        if(!token){
             return res.status(401).json({ msg: 'Access denied. No token provided.' });
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
        const userData=await user.findById(decoded.userId)
        if (!userData) {
            return res.status(401).json({ msg: 'Invalid token. User not found.' });
        }
        req.user=userData
        next()
    }
    catch(error){

        return res.status(401).json({ msg: 'Invalid token.' });
    }
}
module.exports=authenticate