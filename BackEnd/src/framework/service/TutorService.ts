import jwt,{JwtPayload} from 'jsonwebtoken'
import configKeys from '../../configkeys'
export const tutorService=()=>{
    const secret=configKeys.Jwt_Secret
        const verifyToken=async(Token:{token:string})=>{
            const tokens=Token.token
         const decoded= await jwt.verify(tokens,secret)
        
         return decoded
     
}

return{
    verifyToken
}
}
export type TutorService=typeof tutorService
export type TutorServiceReturn=ReturnType<TutorService>