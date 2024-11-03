module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
  SUBMIT_SERVICE_URL:
    process.env.SUBMIT_SERVICE_URL || "http://localhost:5005/api",
  DELIVER_SERVICE_URL:
    process.env.DELIVER_SERVICE_URL || "http://localhost:5000/api",
  PORT: process.env.PORT || 5001,
};
