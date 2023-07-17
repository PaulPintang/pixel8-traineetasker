import express from "express";
const router = express.Router();
import {
  getTraineeProfile,
  addTrainee,
  allTrainee,
  addTaskTimeSheet,
  timeInOutDTR,
} from "../controllers/traineeController";
import { isAuth } from "../middleware/authMiddleware";

router.get("/:course", isAuth, allTrainee);
router.get("/profile/:id", isAuth, getTraineeProfile);
router.put("/timesheet", isAuth, addTaskTimeSheet);
router.put("/dtr/inout", isAuth, timeInOutDTR);
router.post("/add", isAuth, addTrainee);

module.exports = router;
