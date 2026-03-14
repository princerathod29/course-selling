import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { connectDB } from './config/db.js';
import { ENV } from './config/env.js';
import  router from './routes/user.routes.js';
import courseRoute from './routes/course.routes.js';
import moduleRoute from './routes/module.route.js';
import quizRoute from './routes/quiz.route.js';


const app = express();
connectDB();
// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use('/api/v1/users', router)
app.use('/api/v1/course', courseRoute)
app.use('/api/v1/module', moduleRoute)
app.use('/api/v1/quiz', quizRoute)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

app.listen(ENV.PORT, () => {
  console.log("server started", ENV.PORT)
  connectDB()
});