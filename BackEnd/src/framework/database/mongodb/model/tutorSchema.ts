import {Schema,model} from 'mongoose'
import { CourseInterface } from '../../../../Types/CourseInterface'

const tutorSchema=new Schema({

    email:{
        type:String,
        required:[true]
    },
    name:{
       type:String,
       required:[true]
    },
    password:{
        type:String,
        //required:[true]
    },
    course:{
        type:Array<CourseInterface>,
        ref:'course'
        
    },
    status:{
        type:Boolean,
        required:[true]
    },
    highestqualification:{
        type:String
    },
    address:{
        type:String
    },
    age:{
        type:String
    }
})
const Tutor=model('tutor',tutorSchema)
export default Tutor