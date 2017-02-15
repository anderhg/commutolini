var data = require('../data.json');

exports.viewSchedule = function(req, res) {
	res.render('schedule', data);
}