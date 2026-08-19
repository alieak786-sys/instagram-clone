const jwt =require('jsonwebtoken')
const auth=async(req,res,next)=>{
const token = req.cookies.token
if(!token){
    return res.status(200).json({message:"token not found"})
}
const verifytoken=await jwt.verify(token,process.env.SECRET)
req.userid=verifytoken.id
next()
}
module.exports=auth