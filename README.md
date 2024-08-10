Job Board Application
This repository contains both the frontend and backend components for a Job Board application. The project is designed to be a robust and scalable solution for managing job listings and user accounts, with secure authentication and a responsive user interface.

Features

**Backend**

**User Authentication:** Secure user registration and login using JWT.
**Job Management:** Create, read, update, and delete job listings.
**Authentication Middleware**: Protect routes with JWT-based authentication.
Frontend
**Job Listings:** Browse and search for job opportunities.
**User Authentication:** Register and log in to manage job postings.
**Create & Manage Jobs:** Employers can create, edit, and delete job listings.
**Responsive Design:** Optimized for both desktop and mobile devices.
Installation
Backend Setup
# Job Board API

This repository contains the backend API for a Job Board application. It provides endpoints for job management and user authentication.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt.js

## API Endpoints

### Job Management

#### Create a New Job
- **POST** `/api/jobs/create`
- Creates a new job listing
- Requires authentication

#### Update a Job
- **PATCH** `/api/jobs/update/:id`
- Updates an existing job listing
- Requires authentication and ownership of the job

#### Delete a Job
- **DELETE** `/api/jobs/delete/:id`
- Deletes a job listing
- Requires authentication and ownership of the job

#### Get a Specific Job
- **GET** `/api/jobs/get/:id`
- Retrieves details of a specific job listing

#### Get All Jobs
- **GET** `/api/jobs/get-all-jobs`
- Retrieves a list of all jobs with limited fields (logo, position, salary)

#### Filter Jobs by Skills
- **GET** `/api/jobs/filter/:skills`
- Filters jobs based on provided skills
- Skills should be comma-separated

#### Search Jobs
- **GET** `/api/jobs/search/:query`
- Searches jobs based on company name, position, job type, or description

### User Authentication

#### User Registration
- **POST** `/api/auth/register`
- Registers a new user
- Required fields: email, name, phone, password

#### User Login
- **POST** `/api/auth/login`
- Authenticates a user and returns a JWT
- Required fields: email, password

## Setup and Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your MongoDB database
4. Create a `.env` file with the following variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `TOKEN_SECRET`: Secret key for JWT signing
5. Start the server: `npm start`

## Error Handling

The API includes basic error handling. All endpoints will return appropriate HTTP status codes and error messages in case of failures.

## Security

- Passwords are hashed using bcrypt before storing in the database
- JWT is used for authentication
- User IDs are verified for protected routes to ensure users can only modify their own data

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check issues page if you want to contribute.

## License

[MIT](https://choosealicense.com/licenses/mit/)
Frontend
bash
Copy code
job-board-frontend/
├── public/                # Static files and index.html
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Pages (Home, Login, Job Details, etc.)
│   ├── services/          # API service functions
│   ├── App.js             # Main application component
│   ├── index.js           # Entry point of the app
│   └── styles/            # CSS/SCSS files
├── .env                   # Environment variables
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
Available Scripts
Backend
npm start: Runs the server in development mode.
npm test: Runs the backend test suite.

Frontend

Frontend Setup
To set up the frontend locally:

Clone the frontend repository:

bash
Copy code
git clone https://github.com/yourusername/job-board-frontend.git
cd job-board-frontend
Install dependencies:

bash
Copy code
npm install
Environment setup:

Create a .env file in the root directory and add the following variable:

bash
Copy code
REACT_APP_API_URL=http://localhost:3000/api
Replace http://localhost:3000/api with the URL of your backend API.

Run the frontend application:

bash
Copy code
npm start
The application will be available at http://localhost:3000.
npm start: Runs the app in development mode.
npm run build: Builds the app for production.
npm test: Launches the test runner.
npm run eject: Ejects the app from Create React App (if applicable).
Contributing

Contributions are welcome! Feel free to fork the repository, submit a pull request, or open an issue.

License
This project is licensed under the MIT License.


