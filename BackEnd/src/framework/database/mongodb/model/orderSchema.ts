import mongoose from 'mongoose'
const orderSchema=new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'course', required: true }], 
    price: { type: Number, required: true },
    status:{
        type:Boolean,
        required:[true]
    }
})
const Order=mongoose.model('order',orderSchema)
export default Order