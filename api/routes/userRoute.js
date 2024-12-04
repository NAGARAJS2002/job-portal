import express from "express";
import { logout, signin, signup } from "../controllers/userController.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();


router.post('/signup',singleUpload,signup)
router.post('/signin',signin)
router.get('/logout',logout)



export default router;