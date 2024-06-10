import express from "express";
import dotenv from  'dotenv';
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/userRoutes.js";
import chatRouter from  './routes/chatRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import {notFound,errorHandler} from "./middleware/errorMiddleware.js";

dotenv.config();


connectDB();
const app=express();
app.use(cors());
app.use(express.json()); // to accept json data

const port=process.env.PORT;

app.get('/',(req,res)=>{
    res.send("API is running");
})

app.use('/api/user',router);
app.use('/api/chat',chatRouter);
app.use("/api/message",messageRouter);
app.use(notFound);
app.use(errorHandler);


app.listen(`${port}`,console.log(`Server is running on port  ${port}`));
