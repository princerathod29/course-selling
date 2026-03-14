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
    question:{                              // ← singular rakho
        type:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Question"                  // ← "Question" not "Questions"
        }],
        default:[]                          // ← yeh lagao
    },
}, {timestamps:true})

export const Quiz = mongoose.model("Quiz", quizSchema)