// const express = require("express");
import  express  from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express()



app.get("/",(req,res,next)=>{
    return res.status(200).send("server is up")
})



const port = process.env.PORT || 4000

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})