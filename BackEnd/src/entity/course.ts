const course=(course:{title:string,Description:string,price:number})=>{
    return{
        getCourseTitle:()=>course?.title,
        getCourseDescription:()=>course?.Description,
        getCoursePrice:()=>course?.price

    }
    
}
export default course
export type CourseEntity=ReturnType<typeof course>