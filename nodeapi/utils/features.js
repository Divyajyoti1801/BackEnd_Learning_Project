import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
  res
    .status(statusCode)
    .cookie("token", token, { httpOnly: true, max_age: 15 * 60 * 60 })
    .json({
      success: true,
      message: message,
    });
};
