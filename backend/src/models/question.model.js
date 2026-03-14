import mongoose from "mongoose";

export const questionSchema = new mongoose.Schema({
    quizId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Quiz",
        required:true
    },
    content:{
        type:String,
        required:true
    },
    option:[
        {
            type:String
        }
    ],
    correctOption:{
        type:String
    },
    explanation:{
        type:String
    },
},{timestamps:true})

export const Questions = mongoose.model("Question", questionSchema)