import { GoogleGenerativeAI } from "@google/generative-ai";
import { Quiz } from "../models/quiz.model.js";
import { ENV } from "../config/env.js";
import { Questions } from "../models/question.model.js";
import { Modules } from "../models/module.model.js";

const genAi = new GoogleGenerativeAI(ENV.GEMINI_API_KEY)
const model = genAi.getGenerativeModel({model:'gemini-2.5-flash'})

export const checkQuiz = async(req,res)=>{
    try {
        const moduleId = req.params.id;

        const quiz = await Quiz.findOne({
            userId:req.user._id,
            moduleId
        })

        return res.status(200).json({
            success:true,
            hasQuiz: quiz ? true : false,
            quiz: quiz || null
        })
    } catch (error) {
        console.log(error, "from check quiz")
    }
}


export const generateQuiz = async(req, res)=>{
    try {
        const {moduleId, content} = req.body;

        if(!moduleId || !content){
            return res.status(400).json({
                message:"Something is missing"
            })
        }

        const existingQuiz = await Quiz.findOne({
            userId:req.user._id,
            moduleId
        })

        // ✅ "question" use karo "questions" nahi
        if(existingQuiz && existingQuiz.question?.length > 0){
            return res.status(200).json({
                message:"You already generated quiz for this module"
            })
        }

        const newQuiz = await Quiz.create({
            userId:req.user._id,
            moduleId
        })

        const prompt = `Generate 10 technical question for ${content}. Each Question should be multiple choice with 4 options. Return the response in this JSON format, no additional text:
        {
            "questions":[
                {
                    "question":"string",
                    "options":["string","string","string","string"],
                    "correctOption":"string",
                    "explanation":"string"
                }
            ]
        }`

        const result = await model.generateContent(prompt)
        const text = result.response.text()

        const cleanText = text
            .replace(/```json/gi,"")
            .replace(/```/g,"")
            .trim()

        let parsed

        try {
            parsed = JSON.parse(cleanText)
        } catch (error) {
            console.log("failed to parse gemini object", error)
            await Quiz.findByIdAndDelete(newQuiz._id)
            return res.status(500).json({message:"Quiz cannot be generated"})
        }

        const generateQuestion = parsed.questions || []

        if(!Array.isArray(generateQuestion) || generateQuestion.length === 0){
            await Quiz.findByIdAndDelete(newQuiz._id)
            return res.status(500).json({message:"No questions generated"})
        }

        const createdQuestion = []

        for(const q of generateQuestion){
            const doc = await Questions.create({
                quizId: newQuiz._id,
                content: q.question,
                options: q.options,
                correctOption: q.correctOption,
                explanation: q.explanation
            })
            createdQuestion.push(doc)
        }

        const ids = createdQuestion.map((q) => q._id)

        // ✅ "question" use karo "questions" nahi
        await Quiz.findByIdAndUpdate(
            newQuiz._id,
            {$push:{question:{$each:ids}}},
            {returnDocument:'after'}
        )

        await Modules.findByIdAndUpdate(
            moduleId,
            {quiz: newQuiz._id},
            {returnDocument:'after'}
        )

        return res.status(201).json({
            message:"Quiz generated"
        })

    } catch (error) {
        console.log(error, "error from generateQuiz")
    }
}


export const getQuiz = async(req,res)=>{
    try {
        const quizId = req.params.id;

        if(!quizId){
            return res.status(400).json({
                message:"quiz id not found"
            })
        }

        const quiz = await Quiz.findOne({
            _id: quizId,
            userId: req.user._id
        // ✅ "question" use karo "questions" nahi
        }).populate("question")

        if(!quiz){
            return res.status(404).json({
                message:"Quiz not found"
            })
        }

        return res.status(200).json({
            success:true,
            quiz
        })
    } catch (error) {
        console.log(error)
    }
}