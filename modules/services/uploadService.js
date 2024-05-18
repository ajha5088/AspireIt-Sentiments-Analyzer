const appLogger = require("../../config/appLogger");
const Internal_Exception = require("../../exceptions/internalException");
const UploadRepo = require("../repositories/uploadRepo")

class AuthService {
  constructor() {
    this.uploadRepo = new UploadRepo();
  }

  uploadFile = async (userId ,file) => {
    try {
      appLogger.info("services - authService - uploadFile - start");
      const params = {
        userId,
        filename: file.originalname,
        fileData: file.buffer,
        contentType: file.mimetype,
      };
      const response = await this.uploadRepo.uploadFile(params);
      appLogger.info("services - authService - uploadFile - end");
      return response;
    } catch (error) {
      appLogger.error(
        "controllers - authController - uploadFile - error"
      );
      throw new Internal_Exception(
        "Internal Error while uploading file ",
        error.message
      );
    }
  };
}

module.exports = AuthService;
