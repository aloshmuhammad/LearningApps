import User from "../model/userSchema";
import Course from "../model/courseSchema";
import Tutor from "../model/tutorSchema";
import mongoose from "mongoose";
import { CourseInterface } from "../../../../Types/CourseInterface";
import {UserInterface} from '../../../../Types/UserInterface'
import { TutorApplyInterface } from "../../../../Types/TutorApplyInterface";
import { UserEntity } from "../../../../entity/user";
import Order from "../model/orderSchema";
import Message from "../model/MessageSchema";
import Task from "../model/TaskSchema";
import { validateLocaleAndSetLanguage } from "typescript";
import { CloudHSM } from "aws-sdk";
export const userRepositoryMongo=()=>{
    const findbyEmail=async(email:string)=>{
      try{
        const user:UserInterface | null =await User.findOne({email})
        return user
      }catch(error:any){
        throw new Error('Error Occured During Finding The User Already Exist')
    }
   
    
    }
    const addUser = async (user:UserEntity) => {
      try{
        const newUser={
          firstName:user?.getFirstName(),
          lastName:user?.getLastName(),
          phoneNo:user?.getPhoneNumber(),
          email:user?.getEmail(),
          password:user?.getPassword()
        }
        console.log(newUser,'ff')
  
          return await User.create(newUser)
      }catch(error:any){
        throw new Error('Error Occured During Adding New User To the Database')
    }
     
      }
      const addUserG=async(userG:{
         email:string,
         firstName:string,
         imageUrl:string
      })=>{
        try{
          return await User.create(userG)
        }catch(error:any){
          throw new Error('Error Occured During Adding New User Through Google')
      }
        
      }
     const phoneNumberVerify=async(phone:{phoneNumber:string})=>{
      try{
        console.log(phone.phoneNumber)
        const user:UserInterface | null=await User.findOne({phoneNo:phone.phoneNumber})
        console.log(user,'ppp')
        return user
      }catch(error:any){
        throw new Error('Error Occured During Verifying The Phone No')
    }
     
     }
      
     const getCourses=async()=>{
      const course=await Course.find({})
      console.log(course,'od')
      return course
     }
     const getCourse=async(courseId:string)=>{
      try{
        const course : CourseInterface | null=await Course.findById(courseId)
        return course
      }catch(err:any){
        throw new Error('Error occured during Fetching The Course')
      }
      
     }
     const orderSet=async(details:{courses:string,user:string,price:number,status:boolean})=>{
      try{

        const newOrder={
          user:details.user,
          courses:[details.courses],
          price:details.price,
          status:details.status
        }
       
       const createdOrder= await Order.create(details)
       
        // await Course.findByIdAndUpdate(details.courses,{user:details.user},{new:true})
       return createdOrder
      }catch(err:any){
        throw new Error('Error occured during Creating The Order')
      }
  
     }
     const getOrder=async(userId:string)=>{

      
      const myCourse=await Order.find({user:userId}).populate('courses')
      console.log(myCourse,'ooi')
     
      return myCourse
    
     }
     const getData=async(userId:string)=>{
      try{

        const data=await User.findById(userId)
        console.log(data,'plk')
        return data
      }catch(err:any){
        throw new Error('Error occured during Fetching User Details for Profile')
      }
     }
     const updateProfile=async(user:{UserId:string,firstName:string,lastName:string,email:string,phoneNo:string,profileUrl:string})=>{
       try{
        const { UserId, firstName, lastName, email, phoneNo,profileUrl } = user;
        const updatedData=await User.findByIdAndUpdate(UserId,{firstName,
        lastName,
        email,
        profileUrl,

        phoneNo},{new:true})
       
       return updatedData
     }catch(err:any){
      throw new Error('Error occured during Updating The Profile')
    }
  }
  const searchRepo=async(searchQuery:any)=>{
    try{
      console.log(searchQuery,'rep')
      const result=await Course.find({$or:[{ title: { $regex: searchQuery, $options: 'i' } },
      { Description: { $regex: searchQuery, $options: 'i' } }]})
      console.log(result,'rsl')
      return result
    }catch(err:any){
      throw new Error('Error occured during the Course Search')
    }
  
  }
  const getTutor = async (userId: string) => {
    try {
    
        const orders = await Order.find({ user: userId }).populate('courses');
        console.log('level1')
       const tutorDetails=[]
        if (orders) {
            for (const order of orders) {
                for (const courseId of order.courses) {
                    const course = await Course.findById(courseId);
                    if (course) {
                        const tutorId = course.tutor;
                        const tutor = await Tutor.findById(tutorId);
                        if (tutor) {
                            tutorDetails.push(tutor)
                        }
                    }
                }
            }
        }
        return tutorDetails
    } catch (err) {
        throw new Error('Error occurred during fetching the my tutors');
    }
  };
  const messageSave=async(message:{isFrom:string,content:string,from:string,reciever:string,commonId:string})=>{
     await Message.create(message)
  }
  const getMessage=async(cId:string)=>{
    const message = await Message.find({
      commonId:cId
    });
     console.log(message,'msg')
    return message
  }
  const getAssignment=async(userId:string)=>{
    const assignment=await Task.find({studId:userId})
    return assignment
  }
  const getStatus=async(userId:string)=>{
   const statuses=await User.findById(userId)
   return statuses
  }
  const existOrder=async(User:string,course:string)=>{
      const existingOrder = await Order.findOne({
          user: User,
          courses:course
        });
        if(existingOrder){
          return({existOrder:true})
        }
  }
  
  
    return {findbyEmail,getStatus,existOrder,addUser,addUserG,phoneNumberVerify,getCourses,getCourse,orderSet,getOrder,getData,updateProfile,searchRepo,getTutor,messageSave,getMessage,getAssignment}
}
export type UserRepositoryMongo=typeof userRepositoryMongo