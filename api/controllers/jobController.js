import jobs from "../models/jobModel.js";
import cloudinary from "../utils/cloud.js";
import getUri from "../utils/dataUrl.js";

import { errorHandler } from "../utils/error.js";

export const createJob = async (req,res,next)  => {
    try {
        const {title,description,location,companyName, requirements} = req.body;
        const userId = req.user;
       
        if (!title||!description||!location||!companyName ||!requirements) {
              return next(errorHandler(400, "something is missing"))          
        }  
   
        const file = req.file;
        if (!file) {
          return res.status(400).json({ error: "logo is required" });
        }
    
        const fileUri = getUri(file);
    
    
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
   
        const job=  await jobs.create({
           title,
           description,
           location,
           companyName,
           requirements:requirements.split(","),
           logo: cloudResponse.secure_url,
           createdUser: userId
   
        });
   
        return res.status(200).json({
           message: "New job created successfully.",
           job,
           success: true
        }) 
    } catch (error) {
        next(error)
    }
}
