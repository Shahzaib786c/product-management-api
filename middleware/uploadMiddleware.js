import multer from "multer";
import path from "path";

// Assignment Requirement:
// 1. Configure disk storage.
// 2. Save uploaded files inside uploads/products.
const storage = multer.diskStorage({
    destination: "uploads/products/",

    // Assignment Requirement:
    // Make every filename unique so one uploaded image
    // cannot overwrite another image with the same name.
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

// Assignment Requirement:
// Reject anything that is not an image.
const fileFilter = (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();

    const allowedExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".webp"
    ];

    if (file.mimetype.startsWith("image/") &&
        allowedExtensions.includes(extension)) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"));
    }
};

// Assignment Requirement:
// Maximum uploaded image size = 2 MB.
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024
    }
});

// Assignment Requirement:
// Export the configured uploader so it can be used
// in the Product POST and PUT routes.
export default upload;