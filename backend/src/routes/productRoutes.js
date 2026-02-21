import express from "express";
import { getProducts, createProduct, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";
import { authMiddleware } from "../middleware/auth.js";
import upload from "../middleware/upload.js";



const router = express.Router();


router.get("/", getProducts)
router.get("/:id", getProductById)

router.post("/", authMiddleware, upload.single("image"), createProduct);
router.put("/:id", authMiddleware, upload.single("image"), updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);



export default router;