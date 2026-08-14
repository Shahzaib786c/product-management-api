import express from "express";
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct, getProductsByCategory } from "../controllers/productController.js"
const router = express.Router();


router.post("/", createProduct)
router.get("/", getProducts)
router.get("/:id", getProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)
router.get("/category/:category", getProductsByCategory)

export default router;