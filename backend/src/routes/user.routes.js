import express from "express";
import { protectRoute } from "../middleware/user.middleware.js";
// import { upload } from "../middleware/multer.js";
import { signup, login, logout, getUser } from "../controllers/user.controller.js";

const router = express.Router();


router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getUser", protectRoute,getUser);

export default router;