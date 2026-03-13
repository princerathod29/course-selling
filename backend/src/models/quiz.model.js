import mongoose from "mongoose";

export const quizSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    
    moduleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Module"
    },
     
    question:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Question"
        }
    ],
}, {timestamps:true})

export const Quiz = mongoose.model("Quiz", quizSchema)