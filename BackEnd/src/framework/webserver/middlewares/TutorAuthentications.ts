import { Request,Response,NextFunction} from "express"
import { authInterface } from "../../../application/services/authInterface"
import { authService } from "../../service/AuthService"
import { JwtPayload } from 'jsonwebtoken'


interface AuthenticatedRequest extends Request {
    tutor: any; 
}

export const TutorAuthentication=async(req:AuthenticatedRequest,res:Response,next:NextFunction)=>{
    try{
        let token=req.headers.authorization
      
        if(token){
            console.log('tokenund')
            const Authserv=authInterface(authService())
            const decode = await Authserv.verifyToken(token) as JwtPayload
         
            req.tutor=decode.Id
            return next()
        }else{
       
            console.log('No token found');
            return res.status(401).json({ message: 'No token found',role:'admin' });
          }
        }
      
     catch (err) {
        console.log(err);
        return res.status(401).json({ message: 'Token validation failed',role:'user' });
   
   
}
}
