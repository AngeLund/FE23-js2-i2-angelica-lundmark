import express from "express";
import cors from "cors";
import { taskRouter } from "./taskRequests.js";


const app = express();

app.use(cors()); 
app.use(express.json()); 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.use('/tasks', taskRouter)

export {app};