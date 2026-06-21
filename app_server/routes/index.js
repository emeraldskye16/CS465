var express = require('express');
var router = express.Router();

const mainController = require('../controllers/main');
const travelController = require('../controllers/travel');

/* GET home page. */
router.get('/', mainController.index);
router.get('/travel', travelController.travel);

module.exports = router;
