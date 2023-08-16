import mongoose, { Schema ,model} from "mongoose";

const taskSchema=new Schema({
    taskUrl:{type:String,required:true},
    studId:{type:String,required:true}
})
const Task=model('task',taskSchema)
export default Task
