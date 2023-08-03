import {Schema,model} from "mongoose";

const userSchema=new Schema({

    firstName:{
        type:String,
        required:[true,'please add a firstName']
    },
    lastName:{
        type:String,
        
    },
    phoneNo:{
        type:Number,
        
    },
    email:{
        type:String,
        required:[true,'please add the email']
    },
    password:{
        type:String,
    
    },
    confirmPassword:{
        type:String,
        
    },
    google:{
         type:Boolean
    },
    status:{
        type:Boolean
    },
    course:[{
        type:Schema.Types.ObjectId
    }]

})
const User = model("User",userSchema)

export default User