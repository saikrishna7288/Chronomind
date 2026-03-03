import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import convertRoutes from "./routes/convertRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Middlewares
app.use(cors({
  origin: "https://chronomind-eight.vercel.app"
}));

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Chronomind Backend Running 🚀");
});

app.use("/api/convert", convertRoutes);
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.send("Server is working");
});

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas Connected ✅");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
