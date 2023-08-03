import { AdminRepoImpl } from "../../framework/database/mongodb/repositories/AdminRepoImpl"
import { AdminRepoInter } from "../../application/repositories/adminRepoInter"
import asyncHandler from 'express-async-handler'
import { Request,Response } from "express"
import { usersBlock } from "../../application/useCases/Admin/adminSignin"
import { fullUsers } from "../../application/useCases/Admin/adminSignin"
import { fullTutors } from "../../application/useCases/Admin/adminSignin"
import { tutorsBLock } from "../../application/useCases/Admin/adminSignin"
import { listCourses } from "../../application/useCases/Admin/adminSignin"
import { listAppliedTutors } from "../../application/useCases/Admin/adminSignin"
import { emailRecruit } from "../../application/useCases/Admin/adminSignin"
import { admitProcess } from "../../application/useCases/Admin/adminSignin"
import { statusApplied } from "../../application/useCases/Admin/adminSignin"
import { courseAdd } from "../../application/useCases/Admin/adminSignin"
import { getCourse } from "../../application/useCases/Admin/adminSignin"
import { getBcourse } from "../../application/useCases/Admin/adminSignin"
const AdminManageController=(adminrepoImplement:AdminRepoImpl,adminrepoInter:AdminRepoInter)=>{

    const adminMange=adminrepoInter(adminrepoImplement())
    const userList=asyncHandler(async(req:Request,res:Response)=>{
        try{
            const ListUser=await fullUsers(adminMange)
            res.json(ListUser)
        }
        catch(error:any){
          
            res.status(500).json({ message: "An error occurred", error: error.message });
        }
      
    })
    const userBlock=asyncHandler(async(req:Request,res:Response)=>{
        try{
            const user: {userId:string,status:boolean}=req.body
            await usersBlock(user,adminMange)
            res.json({status:true})
       
        } catch(error:any){
          
            res.status(500).json({ message: "An error occurred", error: error.message });
        }
    })
   
    const tutorsList=asyncHandler(async(req:Request,res:Response)=>{
        const ListTutor=await fullTutors(adminMange)
        console.log(ListTutor,'mk')
        res.json(ListTutor)
    })
    const tutorBlock=asyncHandler(async(req:Request,res:Response)=>{
        console.log(req.body,'kook')
        const tutor:{userId:string,status:boolean}=req.body
        await tutorsBLock(tutor,adminMange)
        res.json({status:true})
    })
    const courseList=asyncHandler(async(req:Request,res:Response)=>{
           const listCourse=await listCourses(adminMange)
           res.json(listCourse)
    })
    const appliedTutorList=asyncHandler(async(req:Request,res:Response)=>{
               const AppliedTutors=await listAppliedTutors(adminMange)
               res.json(AppliedTutors)
    })
    const recruitTutor=asyncHandler(async(req:Request,res:Response)=>{
        console.log(req.body,'oo')
        const {email}=req.body
        
            const password=Math.random().toString(36).slice(2, 10)
          
        
        
           const emailSend=await emailRecruit(email,password)
    
           const admittedTutor:{name:string,address:string,email:string,age:string,highestqualification:string,status:boolean,password:string,course:string}=req.body
           admittedTutor.status=false
           admittedTutor.password=password
           const course=admittedTutor.course
           const getCourseId=await getCourse(adminMange,course)
           console.log(getCourseId,'loh')

           if(getCourseId!=null){
            admittedTutor.course=getCourseId._id.toString()
           }
          
           const admitDone=await admitProcess(adminMange,admittedTutor)
           const appliedStatus=await statusApplied(adminMange,req.body._id)
           res.json(admitDone)
    })
    const addCourse=asyncHandler(async(req:Request,res:Response)=>{
        const course:{title:string,Description:string,price:number}=req.body
          const AddCourse=await courseAdd(adminMange,course)
          res.json({status:true,AddCourse})
    })
    const getCourses=asyncHandler(async(req:Request,res:Response)=>{
         const buyCourses=await getBcourse(adminMange)
         console.log(buyCourses,'po')
         res.json({code:200 , buyCourses})
    })
    return{userList,userBlock,tutorsList,tutorBlock,courseList,appliedTutorList,recruitTutor,addCourse,getCourses}
}
export default AdminManageController