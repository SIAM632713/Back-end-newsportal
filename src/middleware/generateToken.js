import UserModel from '../model/user.model.js'
import jwt from 'jsonwebtoken'

const JWT_SECRET=process.env.JWT_SECRET_KEY;

const generateToken =async (userID) => {
    try {
        const user=await UserModel.findById(userID)
        if(!user){
            throw new Error("User not found")
        }
        const token=jwt.sign({userID:user._id,role:user.role},JWT_SECRET,{expiresIn: '72h'})
        return token
    }catch(err) {
        console.error(err)
        throw err;
    }
}

export default generateToken;