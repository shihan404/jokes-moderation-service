const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const jokeRoutes = require("./src/routes/jokes");
const authRoutes = require("./src/routes/auth");
require("dotenv").config();
const { PORT } = require("./config");

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later.",
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(limiter);

// Routes
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/jokes", jokeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Something went wrong!",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
});

app.listen(PORT, () => {
    console.log(`Moderate Service running on port ${PORT}`);
});

module.exports = app;
