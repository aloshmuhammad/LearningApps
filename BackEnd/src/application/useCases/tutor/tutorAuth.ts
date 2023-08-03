import { Tutorrepointer} from "../../repositories/tutorRepo";
import { AuthInterface } from "../../services/authInterface";
import { TutorServiceInterface } from "../../services/tutorServiceInterface";
import appliedTutorentity from '../../../entity/appliedtutor'
import { AppliedTutorEntity } from "../../../entity/appliedtutor";



export const tutorLogin=async(tutor:{email:string,password:string},repositories:ReturnType<Tutorrepointer>,services:ReturnType<AuthInterface>)=>{
      
    const Isemailexist=await repositories.findbyEmailTutor(tutor.email)
    console.log(Isemailexist,'oop')
    if(!Isemailexist)return {notTutor:true}
    if(Isemailexist.status)return {Blocked:true}
    const ttrPassword=Isemailexist.password
    if(tutor.password==ttrPassword){
        const  tutor=Isemailexist
        const token= await services.generateToken(Isemailexist._id.toString())
        console.log(token,'lok')
        return {token,tutor,status:true}
    }
    else{
        return {status:false}
    }

}
export const tutorForm=async(tutor:{name:string,email:string,address:string,age:string,highestqualification:string,coverletter:string,resumeurl:string,course:string},repositories:ReturnType<Tutorrepointer>)=>{

    const appliedTutordetails:AppliedTutorEntity=appliedTutorentity(tutor)
    console.log(appliedTutordetails,)
  await repositories.addTutorApply(appliedTutordetails)
   return {status:true}
}
export const tutorSelectCourse=async(repositories:ReturnType<Tutorrepointer>,TutorServices:ReturnType<TutorServiceInterface>,Token:{token:string})=>{
    const Verify=await TutorServices.verifyToken(Token)
    if (typeof Verify === 'string') {
        // Token verification failed
        console.error('Token verification failed');
        return;
      }
  const {Id}=Verify
 
  const findTutor=await repositories.findTutors(Id)
  const Cid=findTutor?.course
const selectTutorCourse=await repositories.tutorCourse(Cid)
   return selectTutorCourse

}
export const videoUrlupload=async(repositories:ReturnType<Tutorrepointer>,videoUrl:string,courseId:string)=>{
   console.log(videoUrl,'o',courseId,'p')
    await repositories.addUrl(videoUrl,courseId)
}
export const getCourseVideos=async(repositories:ReturnType<Tutorrepointer>,courseId:string)=>{
    console.log(courseId,'ooh')
       const video=await repositories.getVideo(courseId)
       return video
}
export const tutorBuyCourse=async(repositories:ReturnType<Tutorrepointer>,TutorServices:ReturnType<TutorServiceInterface>,Token:{token:string})=>{
   
    const Verify=await TutorServices.verifyToken(Token)
    if (typeof Verify === 'string') {
        // Token verification failed
        console.error('Token verification failed');
        return;
      }
  const {Id}=Verify
  const tutor=await repositories.getTcourse(Id)
  

}