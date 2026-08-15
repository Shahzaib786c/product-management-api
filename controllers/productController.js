import Product from "../models/Product.js";
import Category from "../models/Category.js"

export async function createProduct(req, res) {
    try {

        // ===== MULTER / IMAGE UPLOAD REQUIREMENT START =====
        // Assignment Requirement:
        // Product image is required.
        // Multer stores the uploaded image in uploads/products/.
        // req.file.path contains the path of the uploaded image.
        if (!req.file) {
            return res.status(400).json({
                message: "Product image is required"
            });
        }

        const product = await Product.create({
            ...req.body,
            image: req.file.path
        });
        // ===== MULTER / IMAGE UPLOAD REQUIREMENT END =====

        res.status(201).json(
            {
                message: "Product created Successfully!",
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


export async function getProducts(req, res) {
    try {
        const products = await Product.find().populate("category");
        res.status(200).json(
            {
                total: products.length,
                data: products
            });
    }
    catch (error) {
        return res.status(400).json(
            {
                message: error.message
            });
    }
}

export async function getProduct(req, res) {
    try {
        const product = await Product.findById(
            req.params.id,
        ).populate("category");
        if (!product) {
            return res.status(404).json(
                {
                    message: "Category not found"
                }
            );
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(
            {
                message: error.message
            });
    }
}

export async function updateProduct(req, res) {
    try {

        // ===== MULTER / IMAGE UPLOAD REQUIREMENT START =====
        // Assignment Requirement:
        // If a new image is uploaded, save its path in the Product document.
        if (req.file) {
            req.body.image = req.file.path;
        }
        // ===== MULTER / IMAGE UPLOAD REQUIREMENT END =====

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: 'after',
                runValidators: true
            }
        );
        if (!product) {
            return res.status(404).json(
                {
                    message: "Product not found"
                }
            );
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(
            {
                message: error.message
            });
    }
}

export async function deleteProduct(req, res) {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json(
                {
                    message: "Product not found"
                });
        }
        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json(
            {
                message: error.message
            });
    }
}

export async function getProductsByCategory(req, res) {
    try {
        const category = await Category.findOne({
            name: req.params.category
        });

        const products = await Product.find({
            category: category._id
        }).populate("category");

        res.status(200).json(
            {
                total: products.length,
                data: products
            });

    }
    catch (error) {
        return res.status(400).json(
            {
                message: error.message
            });
    }
}