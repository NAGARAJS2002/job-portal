import bcryptjs from "bcryptjs"
import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"
export const signup = async (req,res,next) => {
  try {
    const {username,email,password,role} = req.body;
    if (!username||!email||!password||!role) {
        return res.status(400).json({ error: " (username, email, password, role) are required" });
    }


    
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json(
         'User already exist with this email.'
        )
    } 
 
        const hashedPassword = bcryptjs.hashSync(password,10)

        await User.create({
          username:username,
          email:email,
          password:hashedPassword   ,
          role:role,
        });
    

    return res.status(201).
    json("Account created successfully.");

  } catch (error) {
    next(error)
  }

}

  export const signin = async (req,res,next) => {
    try {
        const {email,password,role} = req.body;
        if (!email||!password||!role) {
            return next(errorHandler(400),'something is missing')
        }

        const vaildUser = await User.findOne({email});
             if (!vaildUser) {
                return next(errorHandler(400),'user is found')
             }
        const vaildPassword = bcryptjs.compareSync(password,vaildUser.password);
             if (!vaildPassword) {
            return next(errorHandler(400,'wrong credential'))
            }

        const token = jwt.sign({id: vaildUser._id},process.env.JWT_SECRET);

            res.cookie('access_token',token,{http:true}).
            status(200).json(vaildUser);

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