require('dotenv').config(); 
// Loads environment variables (including JWT_SECRET)

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport'); 
// Needed BEFORE routes so authentication works

// Load MongoDB connection
require('./app_api/models/db');

// Load Passport configuration (VERY IMPORTANT)
require('./app_api/config/passport');

const apiRouter = require('./app_api/routes/index');
// API routes (register, login, trips, etc.)

const app = express();

// Standard Express middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Initialize Passport BEFORE using routes
app.use(passport.initialize());

// Enable CORS for the Angular dev server and other clients
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

// Serve Angular or static files (if applicable)
app.use(express.static(path.join(__dirname, 'public')));

// API routes mounted under /api
app.use('/api', apiRouter);

// Catch 404 errors
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message });
});

module.exports = app;
