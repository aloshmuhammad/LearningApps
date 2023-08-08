import { TutorInterface } from "../../../../Types/TutorInterface";
import { CourseInterface } from "../../../../Types/CourseInterface";
import Course from "../model/courseSchema";
import Tutor from "../model/tutorSchema";
import TutorApplyS from "../model/tutorapplySchem";
import { AppliedTutorEntity } from "../../../../entity/appliedtutor";
export const tutorrepoimpl=()=>{
   
        const findbyEmailTutor=async(email:string)=>{
            try{
                const tutor:TutorInterface | null = await Tutor.findOne({email})
                return tutor
            }catch(err:any){
        throw new Error('Error Occured During Tutor Login')
    }
}
    
  
    const addTutorApply=async(tutor:AppliedTutorEntity)=>{
        const newApplied={
            name:tutor.getName(),
            email:tutor.getEmail(),
            address:tutor.getAddress(),
            age:tutor.getAge(),
            highestqualification:tutor.getHighestQualification(),
            coverletter:tutor.getCoverLetter(),
            resumeurl:tutor.getResumeUrl(),
            course:tutor.getCourse()
        }
        return await TutorApplyS.create(newApplied)
    }
    const selectCourse=async()=>{
        // const course:CourseInterface | null=await Course.find({})
        // return cours
      }
    const findTutors=async(Id:any)=>{
        const tutor :TutorInterface | null =await Tutor.findById(Id)
        return tutor
    }
    const tutorCourse=async(Cid:any)=>{
        const course :CourseInterface | null=await Course.findById(Cid)
        return course
    }
    const addUrl=async(videoUrl:string,courseId:string)=>{
        await Course.findOneAndUpdate({_id:courseId},{$push:{courseVideo: videoUrl}},{new:true})
    }
    const getVideo=async(courseId:string)=>{
       const course:CourseInterface | null= await Course.findById(courseId)
       return course
    }
    const getTcourse=async(Id:any)=>{
        const tutor:TutorInterface | null=await Tutor.findById(Id).populate('course')
         console.log(tutor)
       
    }
    const getData=async(tutorId:string)=>{
        try{
  
          const data=await Tutor.findById(tutorId)
          
          return data
        }catch(err:any){
          throw new Error('Error occured during Fetching User Details for Profile')
        }
       }
    const updateProfile=async(tutor:{TutorId:string,name:string,address:string,email:string,highestqualification:string,profileUrl:string,age:string})=>{
        try{
         const { TutorId, name, address, email, highestqualification,profileUrl,age } = tutor;
         const updatedData=await Tutor.findByIdAndUpdate(TutorId,{name,
         address,
         email,
         profileUrl,
         age,
         highestqualification
          },{new:true})
        
        return updatedData
      }catch(err:any){
       throw new Error('Error occured during Updating The Profile')
     }
   }
    return {findbyEmailTutor,addTutorApply,findTutors,tutorCourse,addUrl,getVideo,getTcourse,updateProfile,getData}
}
export type Tutorrepoimpl=typeof tutorrepoimpl