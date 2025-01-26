import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRouter.js';
import postRouter from './routes/postRouter.js'; // Import postRouter
import chatRouter from "./routes/chatRouter.js";
//import postRouter from './routes/postRouter.js';
import authRouter from './routes/authRouter.js'; // Import authRouter
import { dbConnection } from './database/dbConnection.js';
import { errorMiddleware } from './middlewares/error.js';

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", 'POST', 'DELETE', 'PUT'],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User, Post, and Auth routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/posts", postRouter); // Add the postRouter here
app.use("/api/chats", chatRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/auth", authRouter); // Add authentication routes

dbConnection();

app.use(errorMiddleware);

export default app;
