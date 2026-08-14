import Category from "../models/Category.js";

export async function createCategory(req, res, next) {
    try {
        const student = await Category.create(req.body);
        res.status(201).json(
            {
                message: "Category created Successfully!",
            }
        );
    }
    catch (error) {
        return res.status(400).json({
            message: error.message || "Failed to create category"
        });
    }
}