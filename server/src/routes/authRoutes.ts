import express from "express";
const router = express.Router();
import { login, logout } from "../controllers/authController";
import { isAuth } from "../middleware/authMiddleware";

router.post("/login", login);
router.post("/logout", isAuth, logout);

module.exports = router;
