var data = require('../data.json');

exports.viewSchedule = function(req, res) {
	var username = req.session.username;
	if (username == undefined){
		res.redirect('/');
		return;
	}else{
		var fakeData = JSON.parse(JSON.stringify(data));
		fakeData.currentUser = fakeData.users[username];
		console.log(fakeData);
		res.render('schedule', fakeData);
	}
}