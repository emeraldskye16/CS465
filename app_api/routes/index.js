const express = require('express');
const router = express.Router();

const {
  tripsList,
  tripsAddTrip,
  tripsFindByCode,
  tripsUpdateTrip
} = require('../controllers/trips');

// /api/trips
router
  .route('/trips')
  .get(tripsList)
  .post(tripsAddTrip);

// /api/trips/:tripCode
router
  .route('/trips/:tripCode')
  .get(tripsFindByCode)
  .put(tripsUpdateTrip);

module.exports = router;