import { TutorInterface } from "../../../../Types/TutorInterface";
import { CourseInterface } from "../../../../Types/CourseInterface";
import Course from "../model/courseSchema";
import Tutor from "../model/tutorSchema";
import TutorApplyS from "../model/tutorapplySchem";
import { AppliedTutorEntity } from "../../../../entity/appliedtutor";
export const tutorrepoimpl=()=>{
    const findbyEmailTutor=async(email:string)=>{
        const tutor:TutorInterface | null = await Tutor.findOne({email})
           return tutor
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
    return {findbyEmailTutor,addTutorApply,findTutors,tutorCourse,addUrl,getVideo,getTcourse}
}
export type Tutorrepoimpl=typeof tutorrepoimpl