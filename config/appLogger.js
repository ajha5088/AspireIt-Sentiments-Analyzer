const { createLogger, format, transports } = require("winston");
const expressWinston = require("express-winston");

class AppLogger {
    constructor() {
        if (!AppLogger.instance) {
            this.configureLogger();
            AppLogger.instance = this;
        }

        return AppLogger.instance;
    }

    configureLogger() {
        this.logger = createLogger({
            level: "info", // Default level
            format: format.combine(
                format.timestamp(),
                format.json() // Log format as JSON
            ),
            transports: [
                // Log warnings to a file
                new transports.File({
                    filename: "logsWarnings.log",
                    level: "warn"
                }),
                // Log errors to a file
                new transports.File({
                    filename: "logsErrors.log",
                    level: "error"
                })
            ]
        });

        // Add console transport for development environment
        if (process.env.NODE_ENV === "development") {
            this.logger.add(new transports.Console({
                format: format.combine(
                    format.colorize(), // Colorize the console output
                    format.simple() // Log format for console
                ),
                level: "info"
            }));
        }

        // Add expressWinston logger for production environment
        if (process.env.NODE_ENV === "production") {
            this.logger.add(new expressWinston.logger({
                transports: [
                    new transports.File({
                        filename: "logs.log" // Log all levels to a single file
                    })
                ],
                format: format.combine(
                    format.timestamp(),
                    format.json()
                ),
                statusLevels: true
            }));
        }
    }
}

module.exports = new AppLogger().logger;
