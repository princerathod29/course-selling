import mongoose from "mongoose"

export const commentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    moduleId:{
        types:mongoose.Schema.Types.ObjectId,
        ref:"Module"
    },
    Comment:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Comments = mongoose.model("Comments", commentSchema)