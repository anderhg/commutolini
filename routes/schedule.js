var data = require('../data.json');

exports.viewSchedule = function(req, res) {
	if (data.currentUser.firstName == undefined){
		res.redirect('/');
		return;
	}
	res.render('schedule', data);
}