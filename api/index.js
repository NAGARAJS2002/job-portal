import express from "express";
const app = express();
import env from "dotenv"
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js"
env.config();
const PORT = 3000;

mongoose.connect(process.env.CONNECTION_STRING).then(()=>{
    console.log('database connected');
});

app.listen(PORT,() => {
    console.log(`Server is running on ${PORT} 3000`);
    
})


app.use('/api/user',userRouter)