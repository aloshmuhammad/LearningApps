import { Tutorrepoimpl } from "../../framework/database/mongodb/repositories/TutorRepImpl";
import { AppliedTutorEntity } from "../../entity/appliedtutor";
export const tutorrepointer=(repositories:ReturnType<Tutorrepoimpl>)=>{
    const findbyEmailTutor=async(email:string)=>await repositories.findbyEmailTutor(email)
    const addTutorApply=async(tutor:AppliedTutorEntity)=>await repositories.addTutorApply(tutor)
    const findTutors=async(Id:any)=>await repositories.findTutors(Id)
    const tutorCourse=async(Cid:any)=>await repositories.tutorCourse(Cid)
    const addUrl=async(videoUrl:string,courseId:string)=>await repositories.addUrl(videoUrl,courseId)
    const getVideo=async(courseId:string)=>await repositories.getVideo(courseId)
    const getTcourse=async(Id:any)=>await repositories.getTcourse(Id)
    return{
        findbyEmailTutor,
        addTutorApply,
        findTutors,
        tutorCourse,
        addUrl,
        getVideo,
        getTcourse
      
    }
}
export type Tutorrepointer = typeof tutorrepointer
