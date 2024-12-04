import express from "express";
const app = express();
import env from "dotenv"
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/userRoute.js"
env.config();
const PORT = 3000;

app.use(express.json())

const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));

mongoose.connect(process.env.CONNECTION_STRING).then(()=>{
    console.log('database connected');
});

app.listen(PORT,() => {
    console.log(`Server is running on ${PORT}`);
    
})


app.use('/api/user',userRouter)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({

        success: false,
        statusCode,
        message,
    }
      
    )
})