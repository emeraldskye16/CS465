const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET /api/trips
const tripsList = async function (req, res) {
  try {
    const trips = await Trip.find().exec();
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching trips', error: err });
  }
};

// POST /api/trips
const tripsAddTrip = async function (req, res) {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (err) {
    res.status(400).json({ message: 'Error adding trip', error: err });
  }
};

// GET /api/trips/:tripCode
const tripsFindByCode = async function (req, res) {
  try {
    const trip = await Trip.findOne({ code: req.params.tripCode }).exec();
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json(trip);
  } catch (err) {
    res.status(500).json({ message: 'Error finding trip', error: err });
  }
};

// PUT /api/trips/:tripCode
const tripsUpdateTrip = async function (req, res) {
  try {
    const updated = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      req.body,
      { new: true }
    ).exec();

    if (!updated) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Error updating trip', error: err });
  }
};

module.exports = {
  tripsList,
  tripsAddTrip,
  tripsFindByCode,
  tripsUpdateTrip
};