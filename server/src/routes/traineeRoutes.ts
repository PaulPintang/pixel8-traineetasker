import express from "express";
const router = express.Router();
import {
  traineeProfile,
  addTrainee,
  allTrainee,
  addTaskTimeSheet,
  timeInOutDTR,
} from "../controllers/traineeController";
import { isAuth } from "../middleware/authMiddleware";

router.get("/:course", isAuth, allTrainee);
router.get("/profile/info", isAuth, traineeProfile);
router.put("/timesheet", isAuth, addTaskTimeSheet);
router.put("/dtr", isAuth, timeInOutDTR);
router.post("/add", isAuth, addTrainee);

module.exports = router;
