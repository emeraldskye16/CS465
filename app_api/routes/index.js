const express = require('express');
const router = express.Router();

// Import controller
const tripsController = require('../controllers/trips');

// GET all trips
router
  .route('/trips')
  .get(tripsController.tripsList);

// GET single trip by code
router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode);

module.exports = router;