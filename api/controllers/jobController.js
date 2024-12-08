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


export const getAllJobs = async (req, res, next) => {
  const {searchTerm , city} = req.query;
  const limit = parseInt(req.query.limit) || 9;
const query ={}

if (searchTerm) {
    query.$or =  [
        {title: {$regex: searchTerm , $options: "i"}},
        {companyName:{$regex: searchTerm , $options: "i"}},
        {description:{$regex: searchTerm , $options: "i"}},
    ]
}
  if (city) {
      query.location = city;
  }
try {
    const job = await jobs.find(query).sort({createAt : -1}).limit(limit);

    res.status(200).json({
        success: true,
        job
    })
    
} catch (error) {
    next(error)
}

};
