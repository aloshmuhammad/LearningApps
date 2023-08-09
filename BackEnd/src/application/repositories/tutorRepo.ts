import { Tutorrepoimpl } from "../../framework/database/mongodb/repositories/TutorRepImpl";
import { AppliedTutorEntity } from "../../entity/appliedtutor";
export const tutorrepointer=(repositories:ReturnType<Tutorrepoimpl>)=>{
    const findbyEmailTutor=async(email:string)=>await repositories.findbyEmailTutor(email)
    const addTutorApply=async(tutor:AppliedTutorEntity)=>await repositories.addTutorApply(tutor)
    const findTutors=async(Id:any)=>await repositories.findTutors(Id)
    const tutorCourse=async(Cid:any)=>await repositories.tutorCourse(Cid)
    const addUrl=async(videoUrl:string,courseId:string)=>await repositories.addUrl(videoUrl,courseId)
    const getVideo=async(courseId:string)=>await repositories.getVideo(courseId)
    const getTcourse=async(TutorId:string)=>await repositories.getTcourse(TutorId)
    const getData=async(tutorId:string)=>await repositories.getData(tutorId)
    const updateProfile=async(tutor:{TutorId:string,name:string,address:string,email:string,highestqualification:string,age:string,profileUrl:string})=>await repositories.updateProfile(tutor)
    return{
        findbyEmailTutor,
        addTutorApply,
        findTutors,
        tutorCourse,
        addUrl,
        getVideo,
        getTcourse,
        updateProfile,
        getData
      
    }
}
export type Tutorrepointer = typeof tutorrepointer
