var data = require('../data.json');

exports.viewEditProfile = function(req, res) {
	var username = req.session.username;
	if (username == undefined){
		res.redirect('/');
		return;
	}else{
		var fakeData = JSON.parse(JSON.stringify(data));
		fakeData.currentUser = fakeData.users[username];
		console.log(fakeData);
		res.render('editProfile', fakeData);
	}
}

exports.editProfileInfo = function(req,res) {

	console.log("car "+req.profileCar);

	var newProfile = {
		"firstName": req.body.firstName,
		"lastName":req.body.lastName,
		"username": "stianvale",
		"image": "images/anon.jpg",
		"about": "Student at UCSD",
		"car": req.body.car,
		"age": "22",
		"rides": "1",
		"address": req.body.address,
		"rating": "3",
		"home": "Pacific Beach",
		"destination": "UCSD",
		"verified": true
	}

	var currentUser = req.session.username;

	data.users[currentUser] = newProfile;

	/*var fakeData = JSON.parse(JSON.stringify(data));
	fakeData.currentUser = fakeData.users[currentUser];
	res.render('profile', fakeData);*/
}
