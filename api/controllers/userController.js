import bcryptjs from "bcryptjs"
import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"
import getUrl from "../utils/dataUrl.js";
import cloudinary from "../utils/cloud.js";


export const signup = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;


    if (!username || !email || !password || !role) {
      return res.status(400).json({ error: "(username, email, password, role) are required" });
    }

  
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "Profile picture is required" });
    }

    const fileUri = getUrl(file);


    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

 
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists with this email." });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);


    await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

  export const signin = async (req,res,next) => {
    try {
        const {email,password,role} = req.body;
        if (!email||!password||!role) {
            return next(errorHandler(400),'something is missing')
        }

        const validUser = await User.findOne({email});
             if (!validUser) {
                return next(errorHandler(400),'user is found')
             }
        const validPassword = bcryptjs.compareSync(password,validUser.password);
             if (!validPassword) {
            return next(errorHandler(400,'wrong credential'))
            }

        const token = jwt.sign({id: validUser._id},process.env.JWT_SECRET);

            res.cookie('access_token',token,{http:true}).
            status(200).json({
              message: `Welcome back ${validUser.username}`,
              validUser,
              success:true
            });

    } catch (error) {
        next(error)
    }
  }

  export const logout = (req,res,next) =>{
     try {
      res.clearCookie('access_token');
      res.status(200).json('user successfully logout')
     } catch (error) {
      next(error)
     }
  }