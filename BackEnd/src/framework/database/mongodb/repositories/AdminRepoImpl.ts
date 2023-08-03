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
        try{
            const admin:AdminInterface | null =await Admin.findOne({email})
            return admin
        }catch(error:any){
            throw new Error('Error Occured During Admin Login')
        }
        
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
        try{
            const tutor=await Tutor.find()
            return tutor
        }catch(error:any){
            throw new Error('Error Occured During Fetching Tutors From the Database')
        }
       
    }
    const BlockTutor=async(userId:string,status:boolean)=>{
        try{
            await Tutor.updateOne({_id:userId},{$set:{status:!status}})
        }catch(error:any){
            throw new Error('Error Occured During Blockin the tutor')
        }
        
    }
    const findCourse=async()=>{
        try{
            const course=await Course.find({})
            return course
        }catch(error:any){
            throw new Error('Error Occured During Fetching Courses From the Database')
        }
       
    }
    const findAppliedTutors=async()=>{
        try{
            const appliedTutors=await TutorApplyS.find({})
            return appliedTutors
        }catch(error:any){
            throw new Error('Error Occured During Managing Applied Tutors')
        }
        
    }
    const addTutor=async(admittedTutor:TutorEntity)=>{
        try{
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
        }catch(error:any){
            throw new Error('Error Occured During Recruiting The Tutor')
        }
   
    }
    const AppliedStatus=async(tutorId:string)=>{
        try{
            await TutorApplyS.updateOne({_id:tutorId},{$set:{
                status:true
             }},{upsert:true})
        }catch(error:any){
            throw new Error('Error Occured During Changing Status of Recruited Tutor')
        }
   
    }
    const addedCourse=async(course:CourseEntity)=>{
        try{
            const newCourse={
                title:course.getCourseTitle(),
                Description:course.getCourseDescription(),
                price:course.getCoursePrice()
            }
           return  await Course.create(newCourse)
        }catch(error:any){
            throw new Error('Error Occured During Adding the New Course')
        }
   
     

    }
    const getCourseID=async(course:string)=>{
        try{
            const crseId=await Course.findOne({title:course})
            return crseId
        }catch(error:any){
            throw new Error('Error Occured During Fetching The CoueseId')
        }
       
    }
    const getOrderCourse=async()=>{
        try{
            const courses=await Order.find({}).populate('courses').populate('user')
            const arr=[1,2,[1,2,3]]
          
            console.log(courses,'cf')
            
            return courses
        }catch(error:any){
            throw new Error('Error Occured During Fetching The Buyed Courses')
        }
     
    }

    return {findbyEmail,findUsers,BlockUser,findTutors,BlockTutor,findCourse,findAppliedTutors,addTutor,AppliedStatus,addedCourse,getCourseID,getOrderCourse}
}
export type AdminRepoImpl=typeof adminRepoImpl