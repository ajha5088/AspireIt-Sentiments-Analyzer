const authMiddleware = require("../../utils/middlewares/authMiddleware");
const SentimentController = require("../controllers/sentimentController");

const sentimentController = new SentimentController();

module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  app.use("/sentiment/v1", router);

  router.post("/analyze_sentiment", authMiddleware, sentimentController.analyzeSentiment);
};