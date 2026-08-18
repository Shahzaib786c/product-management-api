import express from "express";
import { createCategory, getCategories, getCategory, updateCategory, deleteCategory } from "../controllers/categoryController.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/", verifyToken, createCategory)
router.get("/", getCategories)
router.get("/:id", getCategory)
router.put("/:id", verifyToken, updateCategory)
router.delete("/:id", verifyToken, deleteCategory)

export default router;