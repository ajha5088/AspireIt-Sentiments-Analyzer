const AuthController = require("../controllers/authController");

const authController = new AuthController();

module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  app.use("/auth/v1", router);

  router.post("/register", authController.register);
  router.post("/login", authController.login)
  // router.post("/login", authController.logout)
};