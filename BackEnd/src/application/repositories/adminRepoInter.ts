import { AdminRepoImpl } from "../../framework/database/mongodb/repositories/AdminRepoImpl"
import { CourseEntity } from "../../entity/course"
import { TutorEntity } from "../../entity/admittedtutor"
export const adminRepoInter=(repositories:ReturnType<AdminRepoImpl>)=>{
    const findbyEmail=async(email:String)=>await repositories.findbyEmail(email.toString())
    
    const findUsers=async()=>await repositories.findUsers()
    const BlockUser=async(userId:string,status:boolean)=>await repositories.BlockUser(userId,status)
    const findTutors=async()=>await repositories.findTutors()
    const BlockTutor=async(userId:string,status:boolean)=>await repositories.BlockTutor(userId,status)
    const findCourse=async()=>await repositories.findCourse()
    const findAppliedTutors=async()=>await repositories.findAppliedTutors()
    const AppliedStatus=async(tutorId:string)=>await repositories.AppliedStatus(tutorId)
    const addTutor=async(admittedTutor:TutorEntity)=>await repositories.addTutor(admittedTutor)
    const addedCourse=async(course:CourseEntity)=>await repositories.addedCourse(course)
    const getCourseID=async(course:string)=>await repositories.getCourseID(course)
    const getOrderCourse=async()=>await repositories.getOrderCourse()
    const pushTutor=async(CourseId:string,tutorId:string)=>await repositories.pushTutor(CourseId,tutorId)
    return{
        findbyEmail,
        findUsers,
        BlockUser,
        findTutors,
        BlockTutor,
        findCourse,
        findAppliedTutors,
        addTutor,
        AppliedStatus,
        addedCourse,
        getCourseID,
        getOrderCourse,
        pushTutor
    }
}
export type AdminRepoInter=typeof adminRepoInter