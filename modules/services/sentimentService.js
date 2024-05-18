const vader = require("vader-sentiment");
const appLogger = require("../../config/appLogger");
const Internal_Exception = require("../../exceptions/internalException");
const appConstants = require("../../utils/constants/appConstants");
const SentimentRepo = require("../repositories/sentimentRepo")

class AuthService {
  constructor() {
    this.sentimentRepo = new SentimentRepo()
  }

  analyzeSentiment = async (userId , text) => {
    try {
      appLogger.info("services - authService - analyzeSentiment - start");
      const sentimentScores =
        vader.SentimentIntensityAnalyzer.polarity_scores(text);
      let sentiment;
      if (sentimentScores.compound >= 0.05) {
        sentiment = appConstants.SENTIMENTS.POSITIVE;
      } else if (sentimentScores.compound <= -0.05) {
        sentiment = appConstants.SENTIMENTS.NEGATIVE;
      } else {
        sentiment = appConstants.SENTIMENTS.NEUTRAL;
      }

      const params = {
        userId,
        text,
        sentiment: sentiment,
        analyzedAt: new Date()
      }

      const response = await this.sentimentRepo.analyzeSentiment(params)
      appLogger.info("services - authService - analyzeSentiment - end");
      return response;
    } catch (error) {
      appLogger.error(
        "controllers - authController - analyzeSentiment - error"
      );
      throw new Internal_Exception(
        "Internal Error while registring ",
        error.message
      );
    }
  };
}

module.exports = AuthService;
