import mongoose from "mongoose";

const top5EntrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gameId: {
      type: Number,
      required: true,
    },
    position: {
      type: Number,
      required: true,
      min: [1, "La posición debe ser al menos 1"],
      max: [5, "La posición debe ser como máximo 5"],
      validate: {
        validator: Number.isInteger,
        message: "La posición debe ser un número entero",
      },
    },
  },
  { timestamps: true },
);

const Top5Entry = mongoose.model("Top5Entry", top5EntrySchema);

export default Top5Entry;
