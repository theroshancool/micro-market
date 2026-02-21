import express from "express";

import { authMiddleware } from "../middleware/auth.js";
import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../controllers/favoriteController.js";



const router = express.Router();

router.get("/", authMiddleware, getFavorites);
router.post("/:productId", authMiddleware, addFavorite);
router.delete("/:productId", authMiddleware, removeFavorite);

export default router;