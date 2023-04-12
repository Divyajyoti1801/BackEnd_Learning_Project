import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import { connectDB } from "./data/database.js";
import { errorMiddleware } from "./middlewares/error.js";
import taskRouter from "./routes/task.js";
import userRouter from "./routes/user.js";
//Backend Entry Point
export const app = express();

config({
  path: "./data/config.env",
});

//Use of Middleware (Must be declared before usage of router)
app.use(express.json());
app.use(cookieParser());

//User Routing
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

//Using error middleware for handling error
app.use(errorMiddleware);

/* Database Connection */
connectDB();
