import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import Review from "../models/ReviewModel.js";
import { cacheJuego } from "../utils/cacheJuego.js";

export const getGameReviews = catchAsync(async (req, res) => {
  const { gameId } = req.body;

  if (!gameId) {
    throw new AppError("gameId es requerido", 400);
  }

  const reviews = Review.find({ gameId: Number(gameId) })
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
  const { gameId, userId } = req.body;

  if (!gameId || !userId) {
    throw new AppError("gameId y userId son requeridos", 400);
  }

  const reviews = Review.find({ gameId, userId }).sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    data: reviews,
  });
});

export const addReview = catchAsync(async (req, res) => {
  const { gameId, userId, stars, comment } = req.body;

  if (!gameId || !userId || !stars) {
    throw new AppError("gameId, userId y stars son requeridos", 400);
  }

  await cacheJuego(gameId);

  const existingReview = await Review.findOne({ gameId, userId });
  if (existingReview) {
    throw new AppError("Ya has reseñado este juego", 400);
  }

  const review = await Review.create({ gameId, userId, stars, comment });

  res.status(201).json({
    status: "success",
    data: review,
  });
});

export const deleteReview = catchAsync(async (req, res) => {
  const { gameId } = req.params;
  const { userId } = req.body;

  const review = await Review.findOneAndDelete({
    gameId: Number(gameId),
    userId,
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
