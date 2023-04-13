import bcrypt from "bcrypt";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/user.js";
import { sendCookie } from "../utils/features.js";

//Controller for Registering New User
export const createNewUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User Already exists", 404));
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });
    sendCookie(user, res, "Registered Successfully", 201);
  } catch (e) {
    next(e);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("User not registered", 404));

    if (!email || !password)
      return next(new ErrorHandler("Email or Password is invalid", 404));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorHandler("Entered Password is Invalid ", 404));
    }

    sendCookie(user, res, `Welcome back ${user.name}`, 200);
  } catch (e) {
    next(e);
  }
};

export const getUserProfile = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (e) {
    next(e);
  }
};

export const logout = (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        success: true,
        user: req.user,
      });
  } catch (e) {
    next(e);
  }
};
