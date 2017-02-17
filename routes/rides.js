var rides = require('../drivecard.json');

exports.viewRide = function(req, res) {
  	res.json(rides);
}