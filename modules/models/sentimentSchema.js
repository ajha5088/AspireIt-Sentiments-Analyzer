const mongoose = require('mongoose');

const sentimentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  text: { type: String, required: true },
  sentiment: {
    type: String,
    enum: ['Positive', 'Negative', 'Neutral'],
    required: true
  },
  analyzedAt: { type: Date, default: Date.now }, // Date when the text was analyzed
  createdAt: { type: Date, default: Date.now }, // Date when the text was submitted
});

module.exports = mongoose.model('sentiment', sentimentSchema);