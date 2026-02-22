import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { convertText } from "../controllers/convertController.js";

const router = express.Router();

router.post("/", protect, convertText);

export default router;