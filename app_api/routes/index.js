
const express = require('express');
const router = express.Router();

// Controllers
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

const { expressjwt: jwt } = require('express-jwt');

// JWT middleware (protects routes)
const auth = jwt({
  secret: process.env.JWT_SECRET,  // must match your .env file
  algorithms: ['HS256'],           // same algorithm used when creating token
});

router.post('/register', authController.register); 
// creates a new user + returns JWT

router.post('/login', authController.login); 
// logs user in + returns JWT

router.get('/trips', auth, tripsController.tripsList); 
// requires valid token to view trips

router.post('/trips', auth, tripsController.tripsAddTrip); 
// only logged-in users can add trips

router.get('/trips/:tripCode', auth, tripsController.tripsFindByCode); 
// get single trip by code

router.put('/trips/:tripCode', auth, tripsController.tripsUpdateTrip); 
// update trip (PUT request)

module.exports = router
