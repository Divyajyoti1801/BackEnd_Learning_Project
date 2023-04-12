import express from "express";
import { createNewUser, getAllUsers, getUser } from "../controllers/user.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", createNewUser);

router.get("/userid/:id", getUser);

export default router;
