import express from "express";
import amul from "./amul.js";
import connectDB from "./db.js";


connectDB();
const app=express();
app.use(express.json());
app.use("/amul",amul);

const port=5000;
app.listen(port,()=>{
    console.log(`server is running at ${port}`);
});

