import express from "express";
import { isAuth } from "../middleware/authMiddleware";
const router = express.Router();
import {
  addTask,
  updateTaskStatus,
  getAllTasks,
  assignTask,
  taskComment,
  deleteTask,
  addUpdateTaskTodo,
} from "../controllers/taskController";

router.post("/add", isAuth, addTask);
router.put("/assign", isAuth, assignTask);
router.put("/status", isAuth, updateTaskStatus);
router.delete("/:id", isAuth, deleteTask);
router.put("/comment", isAuth, taskComment);
router.put("/todo/:id", isAuth, addUpdateTaskTodo);
router.get("/all", isAuth, getAllTasks);

module.exports = router;
