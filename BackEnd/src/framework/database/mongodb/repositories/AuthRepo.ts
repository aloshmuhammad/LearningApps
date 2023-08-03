import User from "../model/userSchema";
import Course from "../model/courseSchema";
import mongoose from "mongoose";
import { CourseInterface } from "../../../../Types/CourseInterface";
import {UserInterface} from '../../../../Types/UserInterface'
import { TutorApplyInterface } from "../../../../Types/TutorApplyInterface";
import { UserEntity } from "../../../../entity/user";
import Order from "../model/orderSchema";
export const userRepositoryMongo=()=>{
    const findbyEmail=async(email:string)=>{
    const user:UserInterface | null =await User.findOne({email})
    return user
    
    }
    const addUser = async (user:UserEntity) => {
      const newUser={
        firstName:user?.getFirstName(),
        lastName:user?.getLastName(),
        phoneNo:user?.getPhoneNumber(),
        email:user?.getEmail(),
        password:user?.getPassword()
      }
      console.log(newUser,'ff')

        return await User.create(newUser)
      }
      const addUserG=async(userG:{
         email:string,
         firstName:string,
         imageUrl:string
      })=>{
        return await User.create(userG)
      }
     const phoneNumberVerify=async(phone:{phoneNumber:string})=>{
      console.log(phone.phoneNumber)
           const user:UserInterface | null=await User.findOne({phoneNo:phone.phoneNumber})
           console.log(user,'ppp')
           return user
     }
      
     const getCourses=async()=>{
      const course=await Course.find({})
      console.log(course,'od')
      return course
     }
     const getCourse=async(courseId:string)=>{
      const course : CourseInterface | null=await Course.findById(courseId)
      return course
     }
     const orderSet=async(details:{courses:string,user:string,price:number,status:boolean})=>{
      const newOrder={
        user:details.user,
        courses:[details.courses],
        price:details.price,
        status:details.status
      }
     const createdOrder= await Order.create(details)
     
      // await Course.findByIdAndUpdate(details.courses,{user:details.user},{new:true})
     return createdOrder
     }
     const getOrder=async(userId:string)=>{

      
      const myCourse=await Order.findOne({user:userId}).populate('courses')
     
      return myCourse
    
     }
    
    return {findbyEmail,addUser,addUserG,phoneNumberVerify,getCourses,getCourse,orderSet,getOrder}
}
export type UserRepositoryMongo=typeof userRepositoryMongo