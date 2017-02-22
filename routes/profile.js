var data = require('../data.json');

exports.viewProfile = function(req, res) {
	var username = req.session.username;
	if (username == undefined){
		res.redirect('/');
		return;
	}else{
		var fakeData = JSON.parse(JSON.stringify(data));
		fakeData.currentUser = fakeData.users[username];
		fakeData.sessions = username;
		res.render('profile', fakeData);
	}
};

exports.viewUserProfile = function(req, res) {

	if (req.session.username == undefined){
		res.redirect('/');
		return;
	} else if (req.session.username == req.params.username){
		res.redirect('/profile');
	}

	var profileUsername = req.params.username;
	var username = req.session.username;

	var fakeData = JSON.parse(JSON.stringify(data));


	fakeData.currentUser = fakeData.users[profileUsername];
	if (fakeData.currentUser.image != undefined) {
		fakeData.currentUser.image = "../" + fakeData.currentUser.image;
	}
	fakeData.sessions = username;

	res.render('profile', fakeData);
};