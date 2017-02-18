var data = require('../data.json');

exports.viewProfile = function(req, res) {
	if (data.currentUser.firstName == undefined){
		res.redirect('/');
		return;
	}
	res.render('profile', data);
};

exports.viewUserProfile = function(req, res) {

	console.log(req.params.username);
	console.log(data);

	if (data.currentUser.firstName == undefined){
		res.redirect('/');
		return;
	}

	var username = req.params.username;

	var fakeData = JSON.parse(JSON.stringify(data));


	fakeData.currentUser = fakeData.users[username];
	fakeData.currentUser.image = "../" + fakeData.currentUser.image;

	res.render('profile', fakeData);
};