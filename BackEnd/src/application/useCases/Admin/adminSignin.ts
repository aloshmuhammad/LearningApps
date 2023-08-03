import { AdminRepoInter } from "../../repositories/adminRepoInter";
import { AdminInterface } from "../../../Types/AdminInterface";
import { AuthInterface } from "../../services/authInterface";
import  nodeMailer from 'nodemailer'
import { CourseEntity } from "../../../entity/course";
import courseEntity from "../../../entity/course";
import { TutorEntity } from "../../../entity/admittedtutor";
import tutorEntity from '../../../entity/admittedtutor'


export const adminReg=async(Admin:{email:String,password:String},Repository:ReturnType<AdminRepoInter>,AuthService:ReturnType<AuthInterface>)=>{
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
    const tutors=await Repository.findTutors()
    return {tutors}
}
export const tutorsBLock=async(tutor:{userId:string,status:boolean},Repository:ReturnType<AdminRepoInter>)=>{
    await Repository.BlockTutor(tutor.userId,tutor.status)
}
export const listCourses=async(Repository:ReturnType<AdminRepoInter>)=>{
    const course=await Repository.findCourse()
    return {course}
}
export const listAppliedTutors=async(Repository:ReturnType<AdminRepoInter>)=>{
    const appliedTutors=await Repository.findAppliedTutors()
    return {appliedTutors}
}
export const emailRecruit = async (email:string,password:string) => {
  
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
  };
  export const admitProcess=(async(Repository:ReturnType<AdminRepoInter>,admittedTutor:{name:string,address:string,email:string,age:string,highestqualification:string,status:boolean,password:string,course:string})=>{
        
    const tutorDetails:TutorEntity=tutorEntity(admittedTutor)

          await Repository.addTutor(tutorDetails)

  })
  export const statusApplied=(async(Repository:ReturnType<AdminRepoInter>,tutorId:string)=>{
         await Repository.AppliedStatus(tutorId)
  })
  export const courseAdd=(async(Repository:ReturnType<AdminRepoInter>,course:{title:string,Description:string,price:number})=>{
           const courseDetails:CourseEntity=courseEntity(course)
         const courses=await Repository.addedCourse(courseDetails)
         return courses
  })
  export const getCourse=(async(Repository:ReturnType<AdminRepoInter>,course:string)=>{
    console.log(course,'cs')
        const CrseId=await Repository.getCourseID(course)
        console.log(
          CrseId,'ool'
        )
        return CrseId
  })
  export const getBcourse=(async(Repository:ReturnType<AdminRepoInter>)=>{
    const buyCourses=await Repository.getOrderCourse()
    return buyCourses
  })