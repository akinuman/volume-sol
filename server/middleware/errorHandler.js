import Logger from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
  Logger.error("Error occurred:", err);

  if (err.type === "validation") {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }

  // Handle specific error types
  if (err.name === "SolanaError") {
    return res.status(400).json({
      success: false,
      error: "Solana transaction error",
      details: err.message,
    });
  }

  if (err.name === "TokenError") {
    return res.status(400).json({
      success: false,
      error: "Token operation error",
      details: err.message,
    });
  }

  // Default error
  res.status(500).json({
    success: false,
    error: "Internal server error",
    ...(process.env.NODE_ENV === "development" && { details: err.message }),
  });
};
