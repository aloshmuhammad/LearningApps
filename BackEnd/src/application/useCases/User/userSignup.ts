
import { AuthInter } from "../../repositories/authRepo"
import { AuthInterface } from "../../services/authInterface"
import { UserInterface } from "../../../Types/UserInterface"
import userEntity from '../../../entity/user'
import { UserEntity } from "../../../entity/user"
import { StringForNextToken } from "aws-sdk/clients/s3control"



 export const userSignup=async(user:{firstName:string,lastName:string,phoneNo:string,email:string,password:string,confirmPassword:string},userRepository:ReturnType<AuthInter>,authServiceInterface:ReturnType<AuthInterface>)=>{
    try{
        const Isemailexist=await userRepository.findbyEmail(user.email)
    if(Isemailexist)return {status:false}
    user.password=await authServiceInterface.bcryptPassword(user.password)
    const userDetails:UserEntity=userEntity(user)
    const {_id:userId}=await userRepository.addUser(userDetails)
    
    const token=await authServiceInterface.generateToken(userId.toString())
const validUser=await userRepository.findbyEmail(user.email)
console.log(validUser)
    console.log(token,'tkn')
    return {token,validUser} 
    }catch(error:any){
        throw error
      }
    
   
   

}
export const userGgle=async(userG:{email:string,firstName:string,imageUrl:string},userRepository:ReturnType<AuthInter>,authServiceInterface:ReturnType<AuthInterface>)=>{
    try{
        const Isemailexist=await userRepository.findbyEmail(userG.email)
        if(Isemailexist)return {status:false}
        const {_id:userId}=await userRepository.addUserG(userG)
        const token=await authServiceInterface.generateToken(userId.toString())
        const validUser=await userRepository.findbyEmail(userG.email)
        console.log(token,'tkn');
        
        return {token,validUser}
    }catch(error:any){
        throw error
      }
  
}
export const  userCheck=async(userVlid:{email:string,password:string},userRepository:ReturnType<AuthInter>,authServiceInterface:ReturnType<AuthInterface>)=>{
    try{
        const user:UserInterface | null =await userRepository.findbyEmail(userVlid.email)
        if(!user)return {status:false}
        if(user.google)return {google:true}
        if(user.status)return {blocked:true}
        const isPasswordCorrect=await authServiceInterface.comparePassword(userVlid.password,user.password.toString())
        if(!isPasswordCorrect){
            return {password:false}
        }
        
        else{
            const token=await authServiceInterface.generateToken(user._id.toString())
            return {token,user}
        }
    }catch(error:any){
        throw error
      }


}
export const userGgleSign=async(usergSign:{email:string},userRepository:ReturnType<AuthInter>,authServiceInterface:ReturnType<AuthInterface>)=>{
    try{
        const user=await userRepository.findbyEmail(usergSign.email)
        if(user){
            const token=await authServiceInterface.generateToken(user._id.toString())
            return {status:true,user,token}
        }
    }catch(error:any){
        throw error
      }
   

}
export const phoneValidate=async(phone:{phoneNumber:string},userRepository:ReturnType<AuthInter>,authServiceInterface:ReturnType<AuthInterface>)=>{
    try{
        const validNo=await userRepository.phoneNumberVerify(phone)
        if(validNo){
            const token=await authServiceInterface.generateToken(validNo._id.toString())
            return {validNo,token}
        }
    }catch(error:any){
        throw error
      }

   
   
   
}
export const findCourses=async(userRepository:ReturnType<AuthInter>)=>{
    try{
        const Courses=await userRepository.getCourses()
        return Courses
    }catch(error:any){
        throw error
      }
  
}
export const getCourse=async(userRepository:ReturnType<AuthInter>,courseId:string)=>{
    try{
        const course=await userRepository.getCourse(courseId)
        return course
    }catch(error:any){
        throw error
      }
 
}
export const orderAdd=async(details:{courses:string,user:string,price:number,status:boolean},userRepository:ReturnType<AuthInter>)=>{
    try{
        const setOrder=await userRepository.orderSet(details)

        return setOrder
    }catch(error:any){
        throw error
      }
 
}
export const getMycourse=async(userId:string,userRepository:ReturnType<AuthInter>)=>{
    const ourCourse=await userRepository.getOrder(userId)
    return ourCourse
  
}
export const getDetails=async(userId:string,userRepository:ReturnType<AuthInter>)=>{
    try{
        
        const data=await userRepository.getData(userId)
        return data
    }catch(error:any){
        throw error
      }

}
export const profileEdit=async(user:{UserId:string,firstName:string,lastName:string,phoneNo:string,email:string,profileUrl:string},userRepository:ReturnType<AuthInter>)=>{
   try{
     const upData=await userRepository.updateProfile(user)
     return upData
   }catch(error:any){
        throw error
      }
}
export const searchItem=async(searchQuery:any,userRepository:ReturnType<AuthInter>)=>{
    try{
        const result=await userRepository.searchRepo(searchQuery)
        return result
    }catch(error:any){
        throw error
      }
   
}
export const getCourseTutor=async(userId:string,userRepository:ReturnType<AuthInter>)=>{
    try{
        
        const result=await userRepository.getTutor(userId)
        return result
    }catch(error:any){
        throw error
      }
}
export const saveMessage=async(message:{isFrom:string,content:string,from:string,reciever:string,commonId:string},userRepository:ReturnType<AuthInter>)=>{
    await userRepository.messageSave(message)
}
export const fetchMessage=async(cId:string,userRepository:ReturnType<AuthInter>)=>{
    const result=await userRepository.getMessage(cId)
    return result
}
export const fetchAssignment=async(userId:string,userRepository:ReturnType<AuthInter>)=>{
     const result=await userRepository.getAssignment(userId)
     return result
}
export const checkStatus=async(userId:string,userRepository:ReturnType<AuthInter>)=>{
    const result=await userRepository.getStatus(userId)
    return result
}
export const checkOrder=async(User:string,course:string,userRepository:ReturnType<AuthInter>)=>{
    const result=await userRepository.existOrder(User,course)
    return result
}
export  const assSubmit=async(tutorId:string,submitUrl:string,userRepository:ReturnType<AuthInter>)=>{
   const result=await  userRepository.addAss(tutorId,submitUrl)
}