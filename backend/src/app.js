import express from "express"
import cors from "cors"
import morgan from "morgan";
import userRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import path from "path";



const app = express()


app.use(morgan("dev"));
app.use(cors({
  // origin: "http://localhost:3001",
  origin: "https://micro-market-frontend.onrender.com",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
  res.send("Server is running...");
});

// routes
app.use("/auth", userRoutes);
app.use("/products", productRoutes);
app.use("/favorites", favoriteRoutes)
app.use("/uploads", express.static("uploads"));



export default app;
