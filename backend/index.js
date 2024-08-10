 const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
const cors = require('cors')
const authMiddleware = require('./middleware/auth');
const fs = require('fs');
const { error } = require('console');

// Load environment variables from .env file
dotenv.config();

// Initialize the express app
const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true,
    exposedHeaders: ['Auth-token'] // Explicitly expose the Auth-token header
  }));
//app.use(cors());
const PORT = process.env.PORT || 3000; // Fallback to port 3000 if PORT is not set in .env

// Middleware to parse JSON bodies
app.use(bodyParser.json());

//log request data 
// app.use((req,res,next)=>{
//     const log = console.log(`${req.method}-${req.url}- ${req.ip} -${new Date()}`)
//     fs.appendFile("log.txt",log,(err)=>{
//         if(err){
//             console.log(err)
//         }
//     })
//     next()
// })

// Middleware to log request data
app.use((req, res, next) => {
    const log = `${req.method} - ${req.url} - ${req.ip} - ${new Date().toISOString()}\n`;
    fs.appendFile("log.txt", log, (err) => {
        if (err) {
            console.error("Error writing to log file", err);
        }
    });
    next();
});


// Use the authentication routes -login and register
app.use("/api/auth", authRoutes);

//job routes - create job, find,query 
app.use("/api/jobs",authMiddleware, jobRoutes);

// Root router
app.get('/', (req, res) => {
    res.send(`Hi, it is server ${PORT}`);
});

//error handling middleware 
app.use((err, req, res, next) => {
    console.error(err.stack);
    const errorLog = `${req.method} - ${req.url} - ${req.ip} - ${new Date()} - ${err.stack}\n`;
    fs.appendFile("error_log.txt", errorLog, (err) => {
        if(err){
            console.log("error in writing file",err)
        }
    });
    res.status(500).send('Something broke!');
});


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB is connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Hey, the server is starting on port ${PORT}`);
});
