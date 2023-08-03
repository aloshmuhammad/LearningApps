import { AuthServiceReturn } from "../../framework/service/AuthService";

export const authInterface=(service:AuthServiceReturn)=>{
    const bcryptPassword = (password:string)=> service.bcryptPassword(password)
    const generateToken=(Id:string)=>service.generateToken(Id)
    const comparePassword=(password:string,hashedPassword:string)=>service.comparePassword(password,hashedPassword)
    const verifyToken=async(token:string)=>await service.verifyToken(token)
    return{
        bcryptPassword,
        generateToken,
        comparePassword,
        verifyToken
    }

}
export type AuthInterface=typeof authInterface;