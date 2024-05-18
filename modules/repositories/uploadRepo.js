const FileSchema = require("../models/fileSchema");
const appLogger = require("../../config/appLogger");
const DatabaseError = require("../../exceptions/dbError");

class UploadRepo {
  constructor() {
    this.fileSchema = FileSchema;
  }
  async uploadFile(body) {
    try {
      appLogger.info("repositories - authRepo - uploadFile - start");
      const response = await this.fileSchema.create(body);
      appLogger.info("repositories - authRepo - uploadFile - end");

      const responseData = { ...response.toObject() };
      delete responseData.fileData;

      return responseData;
    } catch (error) {
      appLogger.error("repositories - authRepo - uploadFile - error");
      appLogger.error(error.message);
      throw new DatabaseError(error.message);
    }
  }
}

module.exports = UploadRepo;
