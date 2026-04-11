import express from "express";
import playlistController from "../controllers/playlistController.js";
import { protect } from "../controllers/authController.js";

const router = express.Router();

router.use(protect);

router.get("/", playlistController.getPlaylist);
router.post("/", playlistController.setPlaylist);
router.delete("/:id", playlistController.removeFromPlaylist);

export default router;
