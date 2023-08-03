const appliedTutor=(tutor:{name:string,email:string,address:string,age:string,highestqualification:string,coverletter:string,resumeurl:string,course:string})=>{
return{
getName:()=>tutor?.name,
getAddress:()=>tutor?.address,
getEmail:()=>tutor?.email,
getAge:()=>tutor?.age,
getHighestQualification:()=>tutor?.highestqualification,
getCoverLetter:()=>tutor?.coverletter,
getResumeUrl:()=>tutor?.resumeurl,
getCourse:()=>tutor?.course
}
}
export default appliedTutor
export type  AppliedTutorEntity=ReturnType<typeof appliedTutor>