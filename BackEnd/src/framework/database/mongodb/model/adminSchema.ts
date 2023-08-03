import {Schema,model} from 'mongoose'

const adminSchema=new Schema({
    email:{
        type:String,
        required:[true]
    },
    password:{
        type:String,
        required:[true]
    }
})
const Admin=model('admin',adminSchema)
export default Admin