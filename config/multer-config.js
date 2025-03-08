const multer = require("multer");

const storage = multer.memoryStorage();  
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Optional: 5 MB file size limit
});

module.exports = upload;