import jwt from 'jsonwebtoken';

const JWT_SECRET=process.env.JWT_SECRET_KEY;

export const verifyToken=(req,res,next)=>{
    try {
        const token=req.cookies.token
        if(!token){
            return res.status(401).json({message:"Unauthorized Accesss!"});
        }
        const decoded=jwt.verify(token,JWT_SECRET);
        if(!decoded.userID){
            return res.status(401).json({message:"Unauthorized Accesss!"});
        }
        req.userID=decoded.userID;
        req.role=decoded.role;
        next()
    }catch(e){
        return res.status(401).json({message:"Invalid Token!"});
    }
}