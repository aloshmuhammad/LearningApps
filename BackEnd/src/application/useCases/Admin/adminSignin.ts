import { AdminRepoInter } from "../../repositories/adminRepoInter";
import { AdminInterface } from "../../../Types/AdminInterface";
import { AuthInterface } from "../../services/authInterface";
import  nodeMailer from 'nodemailer'
import { CourseEntity } from "../../../entity/course";
import courseEntity from "../../../entity/course";
import { TutorEntity } from "../../../entity/admittedtutor";
import tutorEntity from '../../../entity/admittedtutor'


export const adminReg=async(Admin:{email:String,password:String},Repository:ReturnType<AdminRepoInter>,AuthService:ReturnType<AuthInterface>)=>{
  try{
    const IsadminExist=await Repository.findbyEmail(Admin.email)
    console.log(IsadminExist,'existed')
    if(!IsadminExist) return {status:false}
    const adPass=IsadminExist.password
    if(adPass===Admin.password){
       const token= await AuthService.generateToken(IsadminExist._id.toString())
       return {
         token,status:true
       }
    }
    else return{password:false}
  }catch(error:any){
    throw error
  }
  
}
export const fullUsers=async(Repository:ReturnType<AdminRepoInter>)=>{
  try{
   
    const Users=await Repository.findUsers()
    
    
    return{
        Users
    }
  }catch(error:any){
    throw error
  }


}
export const usersBlock=async(user:{userId:string,status:boolean},Repository:ReturnType<AdminRepoInter>)=>{
  try{
    await Repository.BlockUser(user.userId,user.status)
  }catch(error:any){
    throw error
  }
   
}
export const fullTutors=async(Repository:ReturnType<AdminRepoInter>)=>{
  try{
    const tutors=await Repository.findTutors()
    return {tutors}
  }catch(error:any){
    throw error
  }
    
}
export const tutorsBLock=async(tutor:{userId:string,status:boolean},Repository:ReturnType<AdminRepoInter>)=>{
  try{
    await Repository.BlockTutor(tutor.userId,tutor.status)
  }catch(error:any){
    throw error
  }
    
}
export const listCourses=async(Repository:ReturnType<AdminRepoInter>)=>{
  try{
    const course=await Repository.findCourse()
    return {course}
  }catch(error:any){
    throw error
  }
   
}
export const listAppliedTutors=async(Repository:ReturnType<AdminRepoInter>)=>{
  try{
    const appliedTutors=await Repository.findAppliedTutors()
    return {appliedTutors}
  }catch(error:any){
    throw error
  }
    
}
export const emailRecruit = async (email:string,password:string) => {
  try{
    const mailer = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'alosh.km@gmail.com',
        pass: 'yrdbhkpqqkiqyuqg',
      },
    });
  
    const info = await mailer.sendMail({
      from: '<alosh.km@gmail.com>',
      to: email,
      subject: 'You are appointed As the tutor in Learn-X.',
      html: `Your login mail will be Your email and password is ${password} `
    });
  
    console.log('Message Sent: ' + info.messageId);
  }catch(error:any){
    throw new Error('Error Occured During Sending The mail to the tutor')
  }
  
   
  };
  export const admitProcess=(async(Repository:ReturnType<AdminRepoInter>,admittedTutor:{name:string,address:string,email:string,age:string,highestqualification:string,status:boolean,password:string,course:string})=>{
    try{
      const tutorDetails:TutorEntity=tutorEntity(admittedTutor)

      await Repository.addTutor(tutorDetails)
    }catch(error:any){
      throw error
    }
        
   

  })
  export const statusApplied=(async(Repository:ReturnType<AdminRepoInter>,tutorId:string)=>{
    try{
      await Repository.AppliedStatus(tutorId)
    }catch(error:any){
      throw error
    }
        
  })
  export const courseAdd=(async(Repository:ReturnType<AdminRepoInter>,course:{title:string,Description:string,price:number})=>{
    try{
      const courseDetails:CourseEntity=courseEntity(course)
         const courses=await Repository.addedCourse(courseDetails)
         return courses
    }catch(error:any){
      throw error
    }
     
  })
  export const getCourse=(async(Repository:ReturnType<AdminRepoInter>,course:string)=>{
    try{
      console.log(course,'cs')
      const CrseId=await Repository.getCourseID(course)
      console.log(
        CrseId,'ool'
      )
      return CrseId
    }catch(error:any){
      throw error
    }
   
  })
  export const getBcourse=(async(Repository:ReturnType<AdminRepoInter>)=>{
    try{
      const buyCourses=await Repository.getOrderCourse()
      return buyCourses
    }catch(error:any){
      throw error
    }
    
  })