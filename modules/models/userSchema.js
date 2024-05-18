const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    access_token: { type: String },
    access_token_expires_at: { type: Date },
    refresh_token: { type: String },
    refresh_token_expires_at: { type: Date },
    createdAt: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

module.exports = mongoose.model("user", userSchema);
