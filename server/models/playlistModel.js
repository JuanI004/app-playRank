import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
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
  },
  { timestamps: true },
);

const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist;
