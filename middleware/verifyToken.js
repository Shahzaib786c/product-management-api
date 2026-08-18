import jwt from "jsonwebtoken";
export default function verifyToken(req, res, next) {
    // 1. read the header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }
    // 2. take the part after "Bearer "
    const token = authHeader.split(" ")[1];
    try {
        // 3. verify it with the same secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // 4. attach the user id for later use
        req.userId = decoded.id;
        next(); // allowed — continue to the route
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
