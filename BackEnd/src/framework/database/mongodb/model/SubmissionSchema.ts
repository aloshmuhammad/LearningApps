import mongoose, { Schema ,model} from "mongoose";

const submissionSchema=new Schema({
    submitUrl:{type:String,required:true},
  
    tutorId:{type:String,required:true}
})
const Submit=model('submit',submissionSchema)
export default Submit