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
return {findbyEmail,addUser,addUserG,phoneNumberVerify,getCourses,getCourse,orderSet,getOrder}
}
export type AuthInter=typeof authInter