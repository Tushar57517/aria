import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json())

app.get("/", (req, res) => {
  res.send(`Server is up!`);
});

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
