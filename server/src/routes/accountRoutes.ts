// ? admin
import express from "express";
const router = express.Router();
import {
  addAccount,
  refetchAccount,
  updateAccCourseView,
  getAllAccount,
  updateSupervisorAccount,
  deleteAccount,
} from "../controllers/accountController";
import { isAuth } from "../middleware/authMiddleware";

router.get("/", isAuth, refetchAccount);
router.get("/all", isAuth, getAllAccount);
router.put("/:id", isAuth, updateSupervisorAccount);
router.delete("/delete/:id", isAuth, deleteAccount);
router.put("/view/:course", isAuth, updateAccCourseView);
router.post("/add", isAuth, addAccount);

module.exports = router;
