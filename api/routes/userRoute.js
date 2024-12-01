import express from "express";
import {register } from "../controllers/userController.js";

const router = express.Router();


router.get('/test',register)



export default router;