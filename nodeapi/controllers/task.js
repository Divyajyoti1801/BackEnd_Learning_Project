import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    await Task.create({
      title,
      description,
      user: req.user,
    });
    res.status(201).json({
      success: true,
      message: "Task Added Successfully",
    });
  } catch (e) {
    next(e);
  }
};

export const getAllTask = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ user: userId });
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (e) {
    next(e);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new Error("Task Id invalid", 404));
    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated!",
    });
  } catch (e) {
    next(e);
  }
};
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorHandler("Invalid Task ID", 404));
    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "Task Deleted!",
    });
  } catch (e) {
    next(e);
  }
};
