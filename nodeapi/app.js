import { config } from "dotenv";
import express from "express";
import { connectDB } from "./data/database.js";
import userRouter from "./routes/user.js";
//Backend Entry Point
export const app = express();

config({
  path: "./data/config.env",
});

//To Accept data from req body
app.use(express.json()); //Use of middleware
app.use("/users", userRouter);

/* Database Connection */
connectDB();
