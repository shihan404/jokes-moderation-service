const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const jokeRoutes = require("./src/routes/jokes");
const authRoutes = require("./src/routes/auth");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require("dotenv").config();
const { PORT } = require("./src/config");

const app = express();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'A simple Express API',
            contact: {
                name: 'Your Name',
                email: 'your.email@example.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:5001',
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

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

// Generate Swagger docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
    console.log(`Moderate Service running on port ${PORT}`);
});

module.exports = app;
