import { ObjectId } from "mongoose"


export interface CourseInterface{
   _id:ObjectId,
   title:String,
   Description:String,
   price:Number,
   courseVideo:string[]
   user:String[]
}