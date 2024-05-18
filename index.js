/* -------- MODULE IMPORTS -------- */
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose")
const appLogger = require("./config/appLogger");

/* ------- FILE IMPORTS ------- */
const authRouter = require("./modules/routes/auth");
const uploadRouter = require("./modules/routes/upload");
const sentimentRouter = require("./modules/routes/sentiment");
const errorMiddleware = require("./utils/middlewares/error");

const app = express();
app.use(express.json());

/* --------- CORS SETUP --------- */
app.use(cors());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", process.env.ALLOWED_METHODS);
  res.setHeader("Access-Control-Allow-Headers", process.env.ALLOWED_HEADERS);
  res.setHeader(
    "Access-Control-Allow-Credentials",
    process.env.ALLOWED_CREDENTIALS
  );
  next();
});

/* --------- DATABASE SETUP --------- */

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    appLogger.info("Connected to the database");
  })
  .catch((error) => {
    appLogger.error("Error connecting to the database:", error);
  });

/* ------- STATIC FILE SETUP -------- */
app.use("/static", express.static("uploads"));

/* ------- MIDDLEWARE SETUP -------- */
// Use logger middleware for HTTP request logging
// app.use(morgan("combined", { stream: appLogger.stream }));


/* ---------- ROUTER FUNCTIONS ----------*/
authRouter(app);
uploadRouter(app);
sentimentRouter(app);

/* ---------- LOGGER SETUP ------------ */
app.use(morgan("dev"));

/* --------- ERROR MIDDLEWARE --------- */
app.use(errorMiddleware);

/* ---------- SERVER PORT ------------ */
const server = app.listen(process.env.PORT, () => {
  let addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  appLogger.info(`App running on ${bind} in ${process.env.NODE_ENV} mode`);
});

// Log the server address when the server starts
server.on("listening", () => {
  let addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  appLogger.info(`Server listening on ${bind}`);
});
