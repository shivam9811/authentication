import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt,{JwtPayload} from "jsonwebtoken";
import path from "path";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET||'';

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.post("/signup",(req,res)=>{
    const {email,password}=req.body;
    res.send("signed up");
})

app.post("/signin",(req,res)=>{
    const {email,password}=req.body;
    const token = jwt.sign({
        id:1
    },JWT_SECRET);
    res.cookie("token",token);
    res.send("signed in");
})

app.get("/user",(req,res)=>{
    const token = req.cookies.token;
    const decoded = jwt.verify(token,JWT_SECRET) as JwtPayload;
    res.send({
        userId:decoded.id
    })
})

app.post("/logout",(req,res)=>{
    res.cookie("token","ads");
    res.json({
        message:"logged out!"
    })
})

app.listen(3000);