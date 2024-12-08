import express  from "express";
import { createJob, getAllJobs } from "../controllers/jobController.js";
import {verifyToken} from "../utils/verifyUser.js"
import {singleUpload} from "../middlewares/multer.js"
const router = express.Router();

router.post('/createJob',verifyToken,singleUpload, createJob);
router.get('/get',verifyToken, getAllJobs);



export default router