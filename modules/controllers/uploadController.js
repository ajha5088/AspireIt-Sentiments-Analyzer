const appLogger = require("../../config/appLogger");
const Validate_Request = require("../../exceptions/validateRequest");
const errorHandler = require("../../utils/responseHandlers/errorHandler");
const successHandler = require("../../utils/responseHandlers/successHandler");
const UploadService = require("../services/uploadService");

class SentimentController {
  constructor() {
    this.uploadService = new UploadService();
  }

  uploadFile = async (req, res) => {
    try {
      appLogger.info("contollers - sentimentController - uploadFile - start");
      let { userId } = req.user;
      if (!req.file) {
        throw new Validate_Request("Validation failed", "No file provided");
      }
      const response = await this.uploadService.uploadFile(userId ,req.file);
      appLogger.info("contollers - authController - uploadFile - end");
      successHandler(res, response);
    } catch (error) {
      appLogger.error("controllers - authController - uploadFile - error");
      appLogger.error(error);
      errorHandler(
        res,
        error.statusCode || 500,
        error.message || "Internal Server Error",
        error.errors || []
      );
    }
  };
}

module.exports = SentimentController;
