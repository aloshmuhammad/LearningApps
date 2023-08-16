import { UserRepositoryMongo } from "../../framework/database/mongodb/repositories/AuthRepo"
import { UserEntity } from "../../entity/user"
export const authInter=(repositories:ReturnType<UserRepositoryMongo>)=>{
const findbyEmail=async (email:string)=>await repositories.findbyEmail(email)
const addUser=async(user:UserEntity)=>await repositories.addUser(user)
const addUserG=async(userG:{email:string,firstName:string,imageUrl:string})=>await repositories.addUserG(userG)
const phoneNumberVerify=async(phone:{phoneNumber:string})=>await repositories.phoneNumberVerify(phone)
const getCourses=async()=>await repositories.getCourses()
const getCourse=async(courseId:string)=>await repositories.getCourse(courseId)
const orderSet=async(details:{courses:string,user:string,price:number,status:boolean})=>await repositories.orderSet(details)
const getOrder=async(userId:string)=>await repositories.getOrder(userId)
const getData=async(userId:string)=>await repositories.getData(userId)
const updateProfile=async(user:{UserId:string,firstName:string,lastName:string,email:string,phoneNo:string,profileUrl:string})=>await repositories.updateProfile(user)
const searchRepo=async(searchQuery:any)=>await repositories.searchRepo(searchQuery)
const getTutor=async(userId:string)=>await repositories.getTutor(userId)
const messageSave=async(message:{isFrom:string,content:string,reciever:string,commonId:string,from:string})=>await repositories.messageSave(message)
const getMessage=async(cId:string)=>await repositories.getMessage(cId)
const getAssignment=async(userId:string)=>await repositories.getAssignment(userId)
const getStatus=async(userId:string)=>await repositories.getStatus(userId)
const existOrder=async(User:string,course:string)=>await repositories.existOrder(User,course)
const addAss=async(tutorId:string,submitUrl:string)=>await repositories.addAss(tutorId,submitUrl)
return {findbyEmail,existOrder,addUser,addUserG,phoneNumberVerify,getCourses,getCourse,orderSet,getOrder,getData,updateProfile,searchRepo,getTutor,messageSave,getMessage,getAssignment,getStatus,addAss}
}
export type AuthInter=typeof authInter