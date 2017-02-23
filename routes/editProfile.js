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

	var currentUser = req.session.username;

	var newProfile = data.users[currentUser];

	newProfile.firstName = req.body.firstName;
	newProfile.lastName = req.body.lastName;
	newProfile.car = req.body.car;
	newProfile.address = req.body.address;
	newProfile.about = req.body.about;
	newProfile.phoneNumber = req.body.phoneNumber;
	newProfile.email = req.body.email;

	data.users[currentUser] = newProfile;

	/*var fakeData = JSON.parse(JSON.stringify(data));
	fakeData.currentUser = fakeData.users[currentUser];
	res.render('profile', fakeData);*/
}
