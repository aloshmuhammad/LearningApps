import { TutorInterface } from "../../../../Types/TutorInterface";
import { CourseInterface } from "../../../../Types/CourseInterface";
import User from "../model/userSchema";
import Course from "../model/courseSchema";
import Tutor from "../model/tutorSchema";
import TutorApplyS from "../model/tutorapplySchem";
import { AppliedTutorEntity } from "../../../../entity/appliedtutor";
import Order from "../model/orderSchema";
export const tutorrepoimpl=()=>{
   
        const findbyEmailTutor=async(email:string)=>{
            try{
                const tutor:TutorInterface | null = await Tutor.findOne({email})
                return tutor
            }catch(err:any){
        throw new Error('Error Occured During Tutor Login')
    }
}
    
  
    const addTutorApply=async(tutor:AppliedTutorEntity)=>{
        const newApplied={
            name:tutor.getName(),
            email:tutor.getEmail(),
            address:tutor.getAddress(),
            age:tutor.getAge(),
            highestqualification:tutor.getHighestQualification(),
            coverletter:tutor.getCoverLetter(),
            resumeurl:tutor.getResumeUrl(),
            course:tutor.getCourse()
        }
        return await TutorApplyS.create(newApplied)
    }
    const selectCourse=async()=>{
        // const course:CourseInterface | null=await Course.find({})
        // return cours
      }
    const findTutors=async(Id:any)=>{
        const tutor :TutorInterface | null =await Tutor.findById(Id)
        return tutor
    }
    const tutorCourse=async(Cid:any)=>{
        const course :CourseInterface | null=await Course.findById(Cid)
        return course
    }
    const addUrl=async(videoUrl:string,courseId:string)=>{
        await Course.findOneAndUpdate({_id:courseId},{$push:{courseVideo: videoUrl}},{new:true})
    }
    const getVideo=async(courseId:string)=>{
       const course:CourseInterface | null= await Course.findById(courseId)
       return course
    }
    const getTcourse=async(TutorId:string)=>{
        try{
            const data=await Tutor.findById(TutorId).populate('course')
           
    if (data) {
        if (Array.isArray(data.course)) { // Check if data.course is an array
            const courses = data.course as Array<any>; // Cast to array of any type
    
            if (courses.length > 0) {
              const courseIds = courses.map(course => course._id); // Extract _id values
              console.log(courseIds,'idg')
    
              const orders = await Order.find({ courses: { $in: courseIds } });
             if(orders.length>0){
                console.log(orders,'order')
                const OrderPromises= orders.map(async(order)=>{
                    const Users=await User.findById(order.user)
                    return Users
                })
                const ordersWithUsers = await Promise.all(OrderPromises);
                return ordersWithUsers
              
              
                
             }
            } else {
              console.log('No courses found for Tutor');
            }
          } else {
            console.log('Invalid data.course format');
          }
        } else {
          console.log('No data found for the provided TutorId');
        }
      }
        
        catch (err:any) {
              throw new Error ('Error Occured during Fetching Students for tutor');
            }
          };
      
      
         
       
    
    const getData=async(tutorId:string)=>{
        try{
  
          const data=await Tutor.findById(tutorId)
          
          return data
        }catch(err:any){
          throw new Error('Error occured during Fetching User Details for Profile')
        }
       }
    const updateProfile=async(tutor:{TutorId:string,name:string,address:string,email:string,highestqualification:string,profileUrl:string,age:string})=>{
        try{
         const { TutorId, name, address, email, highestqualification,profileUrl,age } = tutor;
         const updatedData=await Tutor.findByIdAndUpdate(TutorId,{name,
         address,
         email,
         profileUrl,
         age,
         highestqualification
          },{new:true})
        
        return updatedData
      }catch(err:any){
       throw new Error('Error occured during Updating The Profile')
     }
   }
    return {findbyEmailTutor,addTutorApply,findTutors,tutorCourse,addUrl,getVideo,getTcourse,updateProfile,getData}
}
export type Tutorrepoimpl=typeof tutorrepoimpl