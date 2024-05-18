const SentimentSchema = require ("../models/sentimentSchema")
const appLogger = require("../../config/appLogger");
const DatabaseError = require("../../exceptions/dbError");

class SentimentRepo {
  constructor() {
    this.sentimentSchema = SentimentSchema;
  }
  async analyzeSentiment(body) {
    try {
      appLogger.info("repositories - authRepo - analyzeSentiment - start");
      const response = await this.sentimentSchema.create(body);
      appLogger.info("repositories - authRepo - analyzeSentiment - end");

      return response;
    } catch (error) {
      appLogger.error("repositories - authRepo - analyzeSentiment - error");
      appLogger.error(error.message);
      throw new DatabaseError(error.message);
    }
  }
}

module.exports = SentimentRepo;
