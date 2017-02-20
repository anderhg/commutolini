var data = require('../data.json');

exports.viewProfile = function(req, res) {
	var username = req.session.username;
	if (username == undefined){
		res.redirect('/');
		return;
	}else{
		var fakeData = JSON.parse(JSON.stringify(data));
		fakeData.currentUser = fakeData.users[username];
		res.render('profile', fakeData);
	}
};

exports.viewUserProfile = function(req, res) {

	console.log(req.params.username);
	console.log(data);

	if (req.session.username == undefined){
		res.redirect('/');
		return;
	}

	var username = req.params.username;

	var fakeData = JSON.parse(JSON.stringify(data));


	fakeData.currentUser = fakeData.users[username];
	fakeData.currentUser.image = "../" + fakeData.currentUser.image;

	res.render('profile', fakeData);
};