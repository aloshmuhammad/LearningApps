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

      
      const myCourse=await Order.findOne({user:userId}).populate('courses')
     
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
    
    return {findbyEmail,addUser,addUserG,phoneNumberVerify,getCourses,getCourse,orderSet,getOrder,getData,updateProfile,searchRepo}
}
export type UserRepositoryMongo=typeof userRepositoryMongo