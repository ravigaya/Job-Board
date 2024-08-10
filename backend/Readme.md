<!-- This repository contains the backend API for a Job Board application. The API handles user authentication, job creation, reading, updating, and deletion (CRUD operations). It also includes middleware for authentication.

Table of Contents
Installation
Configuration
Running the Application
API Documentation
Authentication API
Job API
Authentication Middleware
Project Structure
Contributing
License
Installation
To set up the project locally, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/ravigaya/job-Board
cd job-board-backend
Install the dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root directory and add the following environment variables:

makefile
Copy code
PORT=3000
DB_URL=mongodb://localhost:27017/jobboard
JWT_SECRET=your_jwt_secret
Set up the database:

Ensure you have MongoDB installed and running. The application will connect to the database specified in the DB_URL environment variable.

Configuration
You can configure the application using the .env file. The following variables are supported:

PORT: The port on which the server will run.
DB_URL: The MongoDB connection string.
JWT_SECRET: Secret key used for signing JWT tokens.
Running the Application
Start the application by running:

bash
Copy code
npm start
The server will start on http://localhost:3000.

API Documentation
Authentication API
The Authentication API handles user registration, login, and token generation.

Register a new user

Endpoint: POST /api/auth/register
Request Body:
json
Copy code
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
Response:
json
Copy code
{
  "message": "User registered successfully"
}
Login a user

Endpoint: POST /api/auth/login
Request Body:
json
Copy code
{
  "email": "john@example.com",
  "password": "password123"
}
Response:
json
Copy code
{
  "token": "jwt_token"
}
Job API
The Job API allows CRUD operations on job postings. All endpoints require authentication.

Create a new job

Endpoint: POST /api/jobs
Request Headers:
Authorization: Bearer jwt_token
Request Body:
json
Copy code
{
  "title": "Software Engineer",
  "description": "We are looking for a software engineer.",
  "company": "Tech Company",
  "location": "New York",
  "salary": "100000"
}
Response:
json
Copy code
{
  "message": "Job created successfully",
  "job": { ... }
}
Get all jobs

Endpoint: GET /api/jobs
Response:
json
Copy code
[
  {
    "_id": "job_id",
    "title": "Software Engineer",
    "description": "We are looking for a software engineer.",
    "company": "Tech Company",
    "location": "New York",
    "salary": "100000"
  },
  ...
]
Get a single job by ID

Endpoint: GET /api/jobs/:id
Response:
json
Copy code
{
  "_id": "job_id",
  "title": "Software Engineer",
  "description": "We are looking for a software engineer.",
  "company": "Tech Company",
  "location": "New York",
  "salary": "100000"
}
Update a job by ID

Endpoint: PUT /api/jobs/:id
Request Headers:
Authorization: Bearer jwt_token
Request Body:
json
Copy code
{
  "title": "Updated Job Title"
}
Response:
json
Copy code
{
  "message": "Job updated successfully",
  "job": { ... }
}
Delete a job by ID

Endpoint: DELETE /api/jobs/:id
Request Headers:
Authorization: Bearer jwt_token
Response:
json
Copy code
{
  "message": "Job deleted successfully"
}
Authentication Middleware
The authentication middleware ensures that only authenticated users can access certain endpoints. It verifies the JWT token passed in the Authorization header of the request.

Usage Example:
javascript
Copy code
const express = require('express');
const authMiddleware = require('./middleware/auth');
const app = express();

app.use('/api/jobs', authMiddleware, jobRoutes);
Project Structure
bash
Copy code
job-board-backend/
├── config/
│   └── db.js          # Database connection configuration
├── controllers/
│   ├── authController.js  # Authentication logic
│   └── jobController.js   # Job CRUD logic
├── middleware/
│   └── auth.js        # Authentication middleware
├── models/
│   ├── User.js        # User model
│   └── Job.js         # Job model
├── routes/
│   ├── authRoutes.js  # Authentication routes
│   └── jobRoutes.js   # Job routes
├── .env               # Environment variables
├── server.js          # Entry point of the application
└── README.md          # Documentation
Contributing
If you wish to contribute to this project, feel free to fork the repository and submit a pull request. All contributions are welcome!

License
This project is licensed under the MIT License. -->