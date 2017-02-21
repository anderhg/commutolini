var data = require("../data.json");


exports.registerUser = function(req, res) { 

	if (req.session.username != undefined){
		res.redirect('/homepage');
		return;
	}

	var newUser = {
		"username": req.body.username,
		"firstName": req.body.firstName,
		"lastName": req.body.lastName,
		"rides": "0"
	}


	data.users[req.body.username] = newUser;

	res.render('/');
}