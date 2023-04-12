import express from "express";
import {
  createNewUser,
  getAllUsers,
  getUserProfile,
  loginUser,
  logout,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", createNewUser);

router.post("/login", loginUser);

router.get("/profile", isAuthenticated, getUserProfile);

router.get("/logout", logout);


export default router;
