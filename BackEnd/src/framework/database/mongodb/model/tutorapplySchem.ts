import {Schema,model} from 'mongoose'
const tutorapplySchema=new Schema({
    name:{
        type:String,
        required:[true]
    },
    address:{
        type:String,
        required:[true]
    },
    course:{
        type:String,
        required:[true]
    },
    email:{
        type:String,
        required:[true]
    },
    age:{
        type:String,
        required:[true]
    },
    highestqualification:{
         type:String,
         required:[true]
    },
    coverletter:{
        type:String,
        required:[true]
    },
    password:{
        type:String
    },
    resumeurl:{
     type:String,
     required:[true]
    },
    status:{
        type:Boolean
    }
})
const TutorApplyS=model('Tutorapply',tutorapplySchema)
export default TutorApplyS