const tripsEndpoint = "http://localhost:3000/api/trips";
const options = {
  method: "GET",
  headers: {
    Accept: "applicaion/json",
  },
};
/*  const fs = require('fs');

const travel = (req, res) => {
  const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

  res.render('travel', {
    title: 'Travlr',
    trips: trips
  });
}; */


const travel = async function (req, res, next) {
  try {
    const response = await fetch(tripsEndpoint, options);
    let json = await response.json();

    let message = null;

    if (!(json instanceof Array)) {
      message = "API lookup error";
      json = [];
    } else if (!json.length) {
      message = "No trips exist in our database!";
    }

    res.render("travel", {
      title: "Travlr Getaways",
      trips: json,
      message
    });

  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  travel
};
