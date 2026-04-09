import express from "express";
import top5Controller from "../controllers/top5Controller.js";
import { protect } from "../controllers/authController.js";

const router = express.Router();

router.use(protect);

router.get("/", top5Controller.getTop5);
router.post("/", top5Controller.setTop5);
router.delete("/reorder", top5Controller.removeFromTop5);
router.put("/:position", top5Controller.reorderTop5);

export default router;
