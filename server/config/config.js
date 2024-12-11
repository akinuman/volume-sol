export const config = {
  port: process.env.PORT || 3001,
  env: process.env.NODE_ENV || "development",
  corsOptions: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    optionsSuccessStatus: 200,
  },
};
