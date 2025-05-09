import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js"; // Giả sử bạn có config db.js
import authRoutes from "./routes/auth.js"; // Import route auth.js

dotenv.config();

const app = express();

// Cấu hình CORS cho frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middleware
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI || "mongodb://localhost:27017/ninjashop",
    }),
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

  app.use("/api", authRoutes);

async function startServer() {
  try {
    await connectDB();
    app.listen(5000, () => {
      console.log(" Server running on port 5000");
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }
}

startServer();
