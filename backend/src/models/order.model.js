import mongoose from "mongoose"

export const orderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USer"
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    totalAmount:{
        type:Number,
        required:true
    },
    stripeSessionId:{
        type:String,
        unique:true
    }
},{timestamps:true})

export const Order = mongoose.model("Order", orderSchema)