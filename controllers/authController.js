import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

// POST /api/auth/register
export async function register(req, res) {
    try {
        const { name, email, password } = req.body;
        // 1. check all fields are present
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // 2. is this email already used?
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }
        // 3. hash the password
        const hashedPassword = await bcrypt.hash(password, 12);
        // 4. save the user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json({
            message: "User registered successfully",
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
