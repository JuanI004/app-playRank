import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import userRoute from "./routes/userRoute.js";
import top5Route from "./routes/top5Route.js";
import playlistRoute from "./routes/playlistRoute.js";
import reviewRoute from "./routes/reviewRoute.js";

const app = express();

// Middleware
app.use(cors());
app.use(helmet());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

app.use(express.json());

// Routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/top-5", top5Route);
app.use("/api/v1/playlist", playlistRoute);
app.use("/api/v1/reviews", reviewRoute);

export default app;
