import bcrypt from 'bcryptjs'
import  jwt  from 'jsonwebtoken'
import configKeys from '../../configkeys'

export const authService=()=>{
  
    const bcryptPassword=async(password:string)=>{
        try{
            const salt = await bcrypt.genSalt(10)
            password=await bcrypt.hash(password, salt)
            return password
        }catch(error:any){
            throw new Error('Error Occured During Hashing The Password')
        }
        
    }
    const generateToken=async(Id:string)=>{
        try{
            const token=jwt.sign({Id},configKeys.Jwt_Secret, {
                expiresIn: "5d",
            })
            return token
        }catch(error:any){
            throw new Error('Error Occured During Generating the Token')
        }
        
       
    }
    
    const comparePassword=(password:string,hashedPassword:string)=>{
        try{
            return bcrypt.compare(password,hashedPassword)
        }catch(error:any){
            throw new Error('Error Occured During Comparing The Password')
        }
        
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