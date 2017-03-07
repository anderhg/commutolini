var data = require('../data.json');

exports.view = function(req, res) {
	var username = req.session["username"];
	if (username == undefined){
		res.redirect('/');
		return;
	}else{
		var fakeData = JSON.parse(JSON.stringify(data));
		fakeData.currentUser = fakeData.users[username];
		fakeData.sessions = username;
		res.render('homepage', fakeData);
	}
};