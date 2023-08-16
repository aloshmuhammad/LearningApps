import {Schema,model} from 'mongoose'

const courseSchema=new Schema({
    title:{
        type:String,
       
    },
    tutor:{
       type:Schema.Types.ObjectId,
       ref:'tutor'
    },
    Description:{
        type:String,
       
    },
    price:{
        type:Number,
       
    },
    buy:{
        type:Boolean,

    },
    courseVideo: [
        {
          type: String
        }
      ],
      user: [
        {
          type: String
        }
      ]
})
const Course=model('course',courseSchema)
export default Course