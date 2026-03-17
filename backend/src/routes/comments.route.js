import express from 'express'
import { protectRoute } from '../middleware/user.middleware.js'
import { createComment } from '../controllers/comment.controller.js'

const commentRoute = express.Router()

commentRoute.post('/createComment/:id', protectRoute, createComment)

export default commentRoute