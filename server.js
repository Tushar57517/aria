import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

connectDB();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

// Routes
app.use("/api/auth", userRoutes);

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});

export default app;
