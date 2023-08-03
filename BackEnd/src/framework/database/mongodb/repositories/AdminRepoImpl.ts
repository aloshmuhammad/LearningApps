import Admin from "../model/adminSchema";
import User from "../model/userSchema";
import Tutor from "../model/tutorSchema";
import Course from "../model/courseSchema";
import Order from "../model/orderSchema";
import TutorApplyS from "../model/tutorapplySchem";
import { TutorInterface } from "../../../../Types/TutorInterface";
import { TutorApplyInterface } from "../../../../Types/TutorApplyInterface";
import { UserInterface } from "../../../../Types/UserInterface";
import { AdminInterface } from "../../../../Types/AdminInterface";
import { CourseInterface } from "../../../../Types/CourseInterface";
import { CourseEntity } from "../../../../entity/course";
import { TutorEntity } from "../../../../entity/admittedtutor";
export const adminRepoImpl=()=>{
    const findbyEmail=async(email:string)=>{
        const admin:AdminInterface | null =await Admin.findOne({email})
        return admin
    }
    const findUsers=async()=>{
        try{
            const user=await User.find()
            return user
        }catch(error:any){
            throw new Error('Error Occured During Fetching Users list From Database')
        }
     
    }
    const BlockUser=async(userId:string,status:boolean)=>{
        try{
            await User.updateOne({_id:userId},{$set:{status:!status}})
        }catch(error:any){
            throw new Error('Error Occured During Blocking The User')
        }
        
    }
    const findTutors=async()=>{
        const tutor=await Tutor.find()
        return tutor
    }
    const BlockTutor=async(userId:string,status:boolean)=>{
        await Tutor.updateOne({_id:userId},{$set:{status:!status}})
    }
    const findCourse=async()=>{
        const course=await Course.find({})
        return course
    }
    const findAppliedTutors=async()=>{
        const appliedTutors=await TutorApplyS.find({})
        return appliedTutors
    }
    const addTutor=async(admittedTutor:TutorEntity)=>{
       const newTutor={
        name:admittedTutor.getName(),
        address:admittedTutor.getAddress(),
        email:admittedTutor.getEmail(),
        age:admittedTutor.getAge(),
        highestqualification:admittedTutor.getHighestQualification(),
        status:admittedTutor.getStatus(),
        password:admittedTutor.getPassword(),
        course:admittedTutor.getCourse()
       }
         await Tutor.create(newTutor)
    }
    const AppliedStatus=async(tutorId:string)=>{
     await TutorApplyS.updateOne({_id:tutorId},{$set:{
        status:true
     }},{upsert:true})
    }
    const addedCourse=async(course:CourseEntity)=>{
        const newCourse={
            title:course.getCourseTitle(),
            Description:course.getCourseDescription(),
            price:course.getCoursePrice()
        }
       return  await Course.create(newCourse)

    }
    const getCourseID=async(course:string)=>{
        const crseId=await Course.findOne({title:course})
        return crseId
    }
    const getOrderCourse=async()=>{
      const courses=await Order.find({}).populate('courses').populate('user')
      const arr=[1,2,[1,2,3]]
    
      console.log(courses,'cf')
      
      return courses
    }

    return {findbyEmail,findUsers,BlockUser,findTutors,BlockTutor,findCourse,findAppliedTutors,addTutor,AppliedStatus,addedCourse,getCourseID,getOrderCourse}
}
export type AdminRepoImpl=typeof adminRepoImpl