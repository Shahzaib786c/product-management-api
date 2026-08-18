import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import router from "./routes/categoryRoutes.js"
import productrouter from "./routes/productRoutes.js"
import authroute from "./routes/authRoutes.js"
import multer from "multer";
import path from "path";
dotenv.config();
import verifyToken from './middleware/verifyToken.js';

const app = express();

connectDB();

app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/categories", router)
app.use("/api/products", productrouter)
app.use("/api/auth", authroute)



app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            message: err.message
        });
    }
    return res.status(500).json({
        message: err.message
    });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
