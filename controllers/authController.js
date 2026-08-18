import bcrypt from "bcryptjs";
import model from "../models/userModel.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export async function register(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name, !email, !password) {
            res.status(400).json(
                {
                    message: "All fields are Required"
                })
        }

        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json(
                {
                    message: "Email Already Registered"
                });
        }

        const hashPassword = await bcrypt.hash(password, 12);
        // console.log(hashPassword)
        const user = await userModel.create({
            name,
            email,
            password: hashPassword
        });
        res.status(201).json({
            message: "User Registered Successfully !",
            user: { id: user._id, name: user.name, email: user.email }
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}


export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // 1. find the user
        const user = await userModel.findOne({ email });
        if (!userModel) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        // 2. check the password
        const isMatch = await bcrypt.compare(password, user.password);
        // console.log(isMatch)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        // 3. create the token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.status(200).json({
            message: "Login successful",
            token: token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

