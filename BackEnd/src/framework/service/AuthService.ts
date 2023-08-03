import bcrypt from 'bcryptjs'
import  jwt  from 'jsonwebtoken'
import configKeys from '../../configkeys'

export const authService=()=>{
    const bcryptPassword=async(password:string)=>{
        const salt = await bcrypt.genSalt(10)
        password=await bcrypt.hash(password, salt)
        return password
    }
    const generateToken=async(Id:string)=>{
          const token=jwt.sign({Id},configKeys.Jwt_Secret, {
            expiresIn: "5d",
        })
        return token
    }
    
    const comparePassword=(password:string,hashedPassword:string)=>{
        return bcrypt.compare(password,hashedPassword)
     }
     const verifyToken=async(token:string)=>{
        const secret=configKeys.Jwt_Secret
        const decoded=await jwt.verify(token,secret)
        return decoded
     }
     
    return {
        bcryptPassword,
        generateToken,
        comparePassword,
        verifyToken
    }
    
}
export type AuthService=typeof authService
export type AuthServiceReturn=ReturnType<AuthService>