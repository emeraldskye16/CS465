// Bring in the DB Connection (which also registers the Trip schema)
const Mongoose = require('./db');
const Trip = Mongoose.model('trips');

// Read seed data from json file
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

// delete any existing records, then insrt seed data 
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
};

// Close the MongoDB connection and exit 
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});