import Category from "../models/Category.js";

export async function createCategory(req, res) {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(
            {
                message: "Category created Successfully!",
            }
        );
    }
    catch (error) {
        return res.status(400).json(
            {
                message: error.message
            });
    }
}


export async function getCategories(req, res) {
    try {
        const categories = await Category.find();
        res.status(200).json(
            {
                total: categories.length,
                data: categories
            });
    }
    catch (error) {
        return res.status(400).json(
            {
                message: error.message
            });
    }
}

export async function getCategory(req, res) {
    try {
        const category = await Category.findById(
            req.params.id,
        );
        if (!category) {
            return res.status(404).json(
                {
                    message: "Category not found"
                }
            );
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json(
            {
                message: error.message
            });
    }
}

export async function updateCategory(req, res) {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: 'after',
                runValidators: true
            }
        );
        if (!category) {
            return res.status(404).json(
                {
                    message: "Category not found"
                }
            );
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json(
            {
                message: error.message
            });
    }
}

export async function deleteCategory(req, res) {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json(
                {
                    message: "Category not found"
                });
        }
        res.status(200).json({ message: "Category deleted" });
    } catch (error) {
        res.status(500).json(
            {
                message: error.message
            });
    }
}