const multer = require('multer');

// Set up storage engine for Multer (memory storage to keep files as Buffers)
const storage = multer.memoryStorage();

const upload = multer({ 
  storage, 
  limits: { fileSize: 1024 * 1024 * 10 }, // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    // Check file type
    const filetypes = /pdf|mp4|mkv|mp3/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(file.originalname.split('.').pop());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb('Error: File upload only supports the following filetypes - ' + filetypes);
  }
});

module.exports = upload;
