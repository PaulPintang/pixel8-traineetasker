import express from "express";
const router = express.Router();
import {
  getNotification,
  pushNotification,
  readAllNotification,
  readNotification,
} from "../controllers/notificationController";
import { isAuth } from "../middleware/authMiddleware";

router.get("/all", isAuth, getNotification);
router.post("/add", isAuth, pushNotification);
router.put("/read:id", isAuth, readNotification);
router.put("/readall", isAuth, readAllNotification);

module.exports = router;
