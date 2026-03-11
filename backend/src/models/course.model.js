import mongoose from "mongoose";

export const courseSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String
    },
    amount:{
        type:Number,
        required:true
    },
    modules:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Modules"
    }
    ]
}, {timestamps:true})

export const Course = mongoose.model("Course", courseSchema)