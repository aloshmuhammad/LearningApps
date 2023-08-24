import mongoose, { Schema, model } from "mongoose";

const messageSchema = new Schema({
    isFrom : { type: String ,required:true},
    content : {type : String ,required : true},
    createdAt: { type: Date, default: Date.now },
    reciever: { type: String ,required: true},
    from:{type:String,required:true},
    commonId:{type:String,required:true},
    time: { type: String, default: "" }

})


const Message = model('messages',messageSchema)

export default Message