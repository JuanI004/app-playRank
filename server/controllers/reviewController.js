import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import Review from "../models/ReviewModel.js";
import { cacheJuego } from "../utils/cacheJuego.js";

export const getGameReviews = catchAsync(async (req, res) => {
  const { gameId } = req.body;

  if (!gameId) {
    throw new AppError("gameId es requerido", 400);
  }

  const reviews = await Review.find({ gameId: Number(gameId) })
    .populate("userId", "name img")
    .sort({ createdAt: -1 });

  const total = reviews.length;
  const avgStars =
    total > 0
      ? (reviews.reduce((sum, r) => sum + r.stars, 0) / total).toFixed(1)
      : null;

  res.status(200).json({
    status: "success",
    data: { reviews, total, avgStars },
  });
});

export const getMyReviews = catchAsync(async (req, res) => {
  const reviews = await Review.find({ userId: req.user._id }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    status: "success",
    data: reviews,
  });
});

export const addReview = catchAsync(async (req, res) => {
  const { gameId, stars, text } = req.body;

  if (!gameId || !stars) {
    throw new AppError("gameId y stars son requeridos", 400);
  }

  await cacheJuego(gameId);

  const review = await Review.findOneAndUpdate(
    { userId: req.user._id, gameId: Number(gameId) },
    { stars, text },
    { upsert: true, returnDocument: "after", runValidators: true },
  );

  res.status(201).json({
    status: "success",
    data: review,
  });
});

export const deleteReview = catchAsync(async (req, res) => {
  const { gameId } = req.params;

  const review = await Review.findOneAndDelete({
    gameId: Number(gameId),
    userId: req.user._id,
  });

  if (!review) {
    throw new AppError("Reseña no encontrada", 404);
  }

  res.status(200).json({
    status: "success",
    data: review,
  });
});

export default {};
