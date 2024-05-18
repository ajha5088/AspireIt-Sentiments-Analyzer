const UploadController = require("../controllers/uploadController");
const authMiddleware = require("../../utils/middlewares/authMiddleware");
const upload = require("../../utils/middlewares/multer");

const uploadController = new UploadController();

module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  app.use("/upload/v1", router);

  router.post(
    "/uploadFile",
    authMiddleware,
    upload.single("file"),
    uploadController.uploadFile
  );
};
