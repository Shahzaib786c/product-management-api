import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct, getProductsByCategory } from "../controllers/productController.js"
const router = express.Router();


router.post("/", upload.single("image"), createProduct)
router.get("/", getProducts)
router.get("/:id", getProduct)
router.put("/:id", upload.single("image"), updateProduct)
router.delete("/:id", deleteProduct)
router.get("/category/:category", getProductsByCategory)

export default router;