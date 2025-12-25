import express from "express";
import cors from "cors";
import { connectDB } from "../config/db.js";
import foodRouter from "../Routes/foodRoute.js";
import userRouter from "../Routes/userRoute.js";
import "dotenv/config";
import cartRouter from "../Routes/cartRoute.js";
import orderRouter from "../Routes/orderRoute.js";
import connectCloudinary from "../config/cloudinary.js";
import categoryRouter from "../Routes/categoryRoute.js";
import settingsRouter from "../Routes/settingsRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:4000"
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, "Not allowed by CORS");
    }
  },
  credentials: true
}));

//DB connection
connectDB();
connectCloudinary();

//api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/category", categoryRouter);
app.use("/api/settings", settingsRouter);
app.get("/", (req, res) => {
  res.send("API working");
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    mongodb: process.env.MONGODB_URI ? "configured" : "missing",
    cloudinary: process.env.CLOUDINARY_CLOUD_NAME ? "configured" : "missing",
    stripe: process.env.STRIPE_SECRET_KEY ? "configured" : "missing",
    jwt: process.env.JWT_SECRET ? "configured" : "missing"
  });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
  });
}

export default app;
