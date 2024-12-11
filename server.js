import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { config } from "./server/config/config.js";
import Logger from "./server/utils/logger.js";
import routes from "./server/routes/index.js";
import { errorHandler } from "./server/middleware/errorHandler.js";

const app = express();

// Security middleware
app.use(helmet());
app.use(cors(config.corsOptions));
app.use(express.json());
app.use(morgan("dev"));

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// API routes
app.use("/api", routes);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

app.listen(config.port, () => {
  Logger.success(`Server running on port ${config.port} in ${config.env} mode`);
});
