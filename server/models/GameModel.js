import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  gameId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  background_image: String,
  metacritic: Number,
  rating: Number,
  ratings_count: Number,
  released: String,
  genres: [
    {
      id: Number,
      name: String,
    },
  ],
  platforms: [
    {
      platform: {
        id: Number,
        name: String,
      },
    },
  ],
  cachedAt: {
    type: Date,
    default: Date.now,
  },
});

const Game = mongoose.model("Game", gameSchema);

export default Game;
