import { tutorSelectCourse } from "../application/useCases/tutor/tutorAuth"

const tutor=(tutor:{name:string,address:string,email:string,age:string,highestqualification:string,status:boolean,password:string,course:string})=>{
  return{
getName:()=>tutor?.name,
getAddress:()=>tutor?.address,
getEmail:()=>tutor?.email,
getAge:()=>tutor?.age,
getHighestQualification:()=>tutor?.highestqualification,
getStatus:()=>tutor?.status,
getPassword:()=>tutor?.password,
getCourse:()=>tutor?.course
  }
}
export default tutor
export type TutorEntity=ReturnType<typeof tutor>