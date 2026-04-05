import app from "./app.js";
import mongoose from "mongoose";

const port = process.env.PORT || 3000;

mongoose.connect(DB).then(() => {
  console.log("DB connection established");
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
