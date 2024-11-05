# jokes-moderation-service

A microservice for moderating jokes submissions. Built with Express, this service allows authorized users to view pending jokes, approve them, and reject jokes that don't meet criteria.

## Overview

**jokes-moderation-service** is a backend service that provides endpoints for reviewing and moderating joke submissions. It includes routes for listing pending jokes, approving jokes, and rejecting jokes. This service uses authentication to ensure only authorized users can perform moderation actions.

## Features

- **View Pending Jokes**: Retrieve a list of jokes awaiting moderation.
- **Approve Jokes**: Approve jokes for publication.
- **Reject Jokes**: Reject jokes that don't meet the required standards.

## Getting Started

### Prerequisites

- **Node.js** (v14.x.x or later)
- **npm** or **yarn**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/jokes-moderation-service.git
   cd jokes-moderation-service
    ```
###Install dependencies
  ```bash
    npm install
    # or
    yarn install
  ```
###Configure environment variables
```bash
    MONGO_URI=mongodb://localhost:27017/jokesdb
    PORT=5001
    JWT_SECRET=your_jwt_secret
```
###Run the development server
```bash
    npm run dev
    # or
    yarn dev
```

### API Documentation

The API includes the following endpoints:

- **GET /api/jokes/moderate**: Retrieve a list of pending jokes (authentication required).
  - **Responses**:
    - `200`: List of pending jokes retrieved successfully.
    - `401`: Unauthorized access.
    - `500`: Internal server error.

- **POST /api/jokes/approve**: Approve a joke (authentication required).
  - **Body**: `{ "jokeId": "joke's ID" }`
  - **Responses**:
    - `200`: Joke approved successfully.
    - `401`: Unauthorized access.
    - `500`: Internal server error.

- **DELETE /api/jokes/reject/:jokeId**: Reject a joke by ID (authentication required).
  - **Parameters**: `jokeId` (path parameter, required)
  - **Responses**:
    - `200`: Joke rejected successfully.
    - `401`: Unauthorized access.
    - `404`: Joke not found.
    - `500`: Internal server error.

- **POST /api/auth/login**: Login endpoint for generating JWT tokens.
  - **Body**: `{ "username": "user's username", "password": "user's password" }`
  - **Responses**:
    - `200`: Returns JWT token for authenticated user.
    - `401`: Invalid credentials.

The Swagger documentation for these endpoints can be accessed at `/api-docs` when the server is running.

### Tools and Technologies

This project leverages a variety of tools and technologies to support development, testing, and deployment.

#### AI Tools
- **ChatGPT**: Used for assistance in code generation, documentation, and troubleshooting.
- **Claude.ai**: Provides advanced AI capabilities for content generation and interaction.

#### Backend
- **Node.js**: JavaScript runtime environment for server-side code execution.
- **Express**: Web application framework for building RESTful APIs.
- **NestJS** (optional, if using in other services): A progressive Node.js framework for scalable and efficient backend services.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js, used for data management and schema validation.
- **JWT (JSON Web Token)**: Used for secure authentication and authorization.

#### Security
- **Helmet**: Middleware for securing HTTP headers.
- **Express Rate Limit**: Protects APIs by limiting repeated requests.
- **bcrypt.js**: For hashing passwords and securing sensitive data.

#### API Documentation
- **Swagger**: Provides interactive API documentation for easy testing and integration.

#### Development Tools
- **Nodemon**: Utility that automatically restarts the server on code changes.
- **ESLint**: Linter for identifying and fixing code issues.
- **Prettier**: Code formatter to maintain consistent code style.
- **Husky**: Git hooks manager to enforce checks before commits.

#### Environment Management
- **dotenv**: Loads environment variables from `.env` files, ensuring configurations are securely managed.

#### Database
- **MongoDB**: NoSQL database used for storing jokes and user data.
- **MySQL** (if applicable in other services): Relational database management system.

This combination of tools and technologies ensures a robust, secure, and scalable application architecture, suitable for modern web applications.

