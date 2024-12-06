import express  from "express";
import { createJob } from "../controllers/jobController.js";
import {verifyToken} from "../utils/verifyUser.js"
const router = express.Router();

router.post('/createJob',verifyToken, createJob)


export default router