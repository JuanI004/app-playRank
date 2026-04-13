import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gameId: {
      type: Number,
      required: true,
    },
    stars: {
      type: Number,
      required: [true, "El rating es obligario"],
      min: [1, "El rating mínimo es 1"],
      max: [5, "El rating maximo es 5"],
      validate: {
        validator: Number.isInteger,
        message: "El rating debe ser un número entero",
      },
    },
    text: {
      type: String,
      maxlength: [1000, "La reseña no puede superar los 1000 caracteres"],
      trim: true,
    },
  },
  { timestamps: true },
);

reviewSchema.index({ userId: 1, gameId: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);

export default Review;
