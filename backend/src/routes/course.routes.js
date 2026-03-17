import express from "express";
import { adminRoute,protectRoute } from "../middleware/user.middleware.js";
import { upload } from "../middleware/multer.js";
import { createCourse, getCourse, getSingleCourse, getPurchasedCourse, getAllPurchasedCourse } from "../controllers/course.controller.js";

const courseRoute = express.Router()

courseRoute.post("/createCourse",protectRoute , adminRoute , upload.single("thumbnail"), createCourse)
courseRoute.get("/courses",protectRoute,getCourse)
courseRoute.get("/singleCourse/:id", protectRoute, getSingleCourse)

courseRoute.get('/purchasedCourse/:id', protectRoute, getPurchasedCourse)

courseRoute.get('/getAllCoursePurchase', protectRoute, getAllPurchasedCourse)

export default courseRoute

