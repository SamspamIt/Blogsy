import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "../config/db.js";
import authRoutes from "../routes/auth.routes.js";
import blogRoutes from "../routes/blog.routes.js";
import uploadRoutes from "../routes/upload.routes.js";



dotenv.config(); // to use the env file earlier

connectDB();//To connect with Mongo DB Atlas

const app = express(); 

//Middleware
app.use(
    cors({
        origin:process.env.CLIENT_URL, 
        credentials:true,
    })
);
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use("/api/auth", authRoutes );
app.use("/api/blogs", blogRoutes );
app.use("/api/upload", uploadRoutes );


app.get("/",(req,res)=>{
    res.send("Blogsy API is running...");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});
