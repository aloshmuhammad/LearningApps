import { CourseInterface } from "./CourseInterface"

export interface TutorInterface{
    _id:String,
    email:String,
    name:String,
    password:string,
    highestqualification:String,
    age:String,
    address:String,
    status:Boolean,
    course:Array<CourseInterface>


}