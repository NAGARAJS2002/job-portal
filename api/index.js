import express from "express";
const app = express();
import env from "dotenv"
env.config();
const PORT = 3000;



app.listen(PORT,() => {
    console.log(`Server is running on ${PORT} 3000`);
    
})