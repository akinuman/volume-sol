export const validateBuyParams = (req, res, next) => {
  const { ca, delay } = req.body;

  if (!ca || typeof ca !== "string") {
    return res.status(400).json({
      success: false,
      error: "Invalid token address",
    });
  }

  if (!delay || typeof delay !== "number" || delay < 0) {
    return res.status(400).json({
      success: false,
      error: "Invalid delay parameter",
    });
  }

  next();
};

export const validateSellParams = (req, res, next) => {
  const { ca, percent } = req.body;

  if (!ca || typeof ca !== "string") {
    return res.status(400).json({
      success: false,
      error: "Invalid token address",
    });
  }

  if (
    percent &&
    (typeof percent !== "number" || percent < 0 || percent > 100)
  ) {
    return res.status(400).json({
      success: false,
      error: "Invalid percentage",
    });
  }

  next();
};

export const validateWalletGenParams = (req, res, next) => {
  const { amount } = req.body;

  if (!amount || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({
      success: false,
      error: "Invalid amount parameter",
    });
  }

  next();
};

export const validateTransferParams = (req, res, next) => {
  const { ca, sendTo } = req.body;

  if (!ca || typeof ca !== "string") {
    return res.status(400).json({
      success: false,
      error: "Invalid token address",
    });
  }

  if (!sendTo || typeof sendTo !== "string") {
    return res.status(400).json({
      success: false,
      error: "Invalid recipient address",
    });
  }

  next();
};

export const validateHumanModeParams = (req, res, next) => {
  const { ca, minDelaySeconds, maxDelaySeconds, sellPct } = req.body;

  if (!ca || typeof ca !== "string") {
    return res.status(400).json({
      success: false,
      error: "Invalid token address",
    });
  }

  if (
    !minDelaySeconds ||
    typeof minDelaySeconds !== "number" ||
    minDelaySeconds < 0
  ) {
    return res.status(400).json({
      success: false,
      error: "Invalid minimum delay",
    });
  }

  if (
    !maxDelaySeconds ||
    typeof maxDelaySeconds !== "number" ||
    maxDelaySeconds < minDelaySeconds
  ) {
    return res.status(400).json({
      success: false,
      error: "Invalid maximum delay",
    });
  }

  if (
    sellPct &&
    (typeof sellPct !== "number" || sellPct < 0 || sellPct > 100)
  ) {
    return res.status(400).json({
      success: false,
      error: "Invalid sell percentage",
    });
  }

  next();
};
