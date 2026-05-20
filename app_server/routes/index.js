var express = require('express');
var router = express.Router();

const ctrlTravel = require('../controllers/travel');

/* GET home page. */
router.get('/travel', ctrlTravel.travel);

module.exports = router;
