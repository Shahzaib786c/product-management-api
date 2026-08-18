import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct, getProductsByCategory } from "../controllers/productController.js"
const router = express.Router();
import verifyToken from "../middleware/verifyToken.js";


router.post("/", verifyToken, upload.single("image"), createProduct)
router.get("/", getProducts)
router.get("/category/:category", getProductsByCategory)
router.get("/:id", getProduct)
router.put("/:id", verifyToken, upload.single("image"), updateProduct)
router.delete("/:id", verifyToken, deleteProduct)

export default router;