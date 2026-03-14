import express from "express";
import { protectRoute } from "../middleware/user.middleware.js";
import { checkQuiz, generateQuiz, getQuiz } from "../controllers/quiz.controller.js";

const quizRoute = express.Router()

quizRoute.get("/checkQuiz/:id", protectRoute, checkQuiz)
quizRoute.post("/generateQuiz", protectRoute, generateQuiz)
quizRoute.get("/getQuiz/:id", protectRoute, getQuiz)

export default quizRoute
