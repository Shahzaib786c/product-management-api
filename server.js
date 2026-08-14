import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import router from "./routes/categoryRoutes.js"
dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use("/api/categories", router)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
