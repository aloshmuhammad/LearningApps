import { Request,Response,NextFunction} from "express"
import { authInterface } from "../../../application/services/authInterface"
import { authService } from "../../service/AuthService"
import { JwtPayload } from 'jsonwebtoken'


interface AuthenticatedRequest extends Request {
    admin: any; 
}

export const AdminAuthentication=async(req:AuthenticatedRequest,res:Response,next:NextFunction)=>{
    try{
        let token=req.headers.authorization
      
        if(token){
            console.log('tokenund')
            const Authserv=authInterface(authService())
            const decode = await Authserv.verifyToken(token) as JwtPayload
         
            req.admin=decode.Id
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
