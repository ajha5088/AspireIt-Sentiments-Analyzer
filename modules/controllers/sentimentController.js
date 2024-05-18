const appLogger = require("../../config/appLogger");
const Validate_Request = require("../../exceptions/validateRequest");
const errorHandler = require("../../utils/responseHandlers/errorHandler");
const successHandler = require("../../utils/responseHandlers/successHandler");
const SentimentService = require("../services/sentimentService");
const { sentimentInputSchema } = require("../validations/sentimentValidation");

class SentimentController {
  constructor() {
    this.sentimentService = new SentimentService();
  }

  analyzeSentiment = async (req, res) => {
    try {
      appLogger.info("contollers - sentimentController - analyzeSentiment - start");
      let { userId } = req.user;
      const validationResult = sentimentInputSchema.validate(req.body);
      if (validationResult.error) {
        throw new Validate_Request("Validation failed", validationResult.error);
      }
      const response = await this.sentimentService.analyzeSentiment(userId ,req.body.text);
      appLogger.info("contollers - authController - analyzeSentiment - end");
      successHandler(res, response);
    } catch (error) {
      appLogger.error("controllers - authController - analyzeSentiment - error");
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
