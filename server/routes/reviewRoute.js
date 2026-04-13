import express from "express";
import { protect } from "../controllers/authController.js";
import {
  getGameReviews,
  getMyReviews,
  addReview,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.get("/game/:gameId", getGameReviews);

router.use(protect);

router.get("/myReviews", getMyReviews);
router.post("/", addReview);
router.delete("/:gameId", deleteReview);

export default router;
