import mongoose from "mongoose";

export const moduleSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  video: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  // quiz: {
  //   type: String,
  //   required: true,
  // },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
}, {timestamps:true});

export const Modules = mongoose.model("Modules", moduleSchema) 
