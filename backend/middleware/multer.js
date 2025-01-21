import multer from "multer";

// Use memory storage to avoid writing to the local filesystem
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit each file to 5MB
});

export default upload;
