var data = require('../data.json');

exports.viewSchedule = function(req, res) {
	var username = req.session["username"];
	data['accordion'] = true;
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

exports.viewTable = function(req,res) {
	var username = req.session["username"];
	data['accordion'] = false;
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