const mongoose = require("mongoose");

const fileDataSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  filename: { type: String, required: true },
  fileData: { type: Buffer, required: true  , select : true},
  contentType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("fileData", fileDataSchema);
