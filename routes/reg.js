var data = require("../data.json");


exports.registerUser = function(req, res) { 

	if (req.session["username"] != undefined){
		res.redirect('/homepage');
		return;
	}

	var newUser = {
		"username": req.body.username,
		"firstName": req.body.firstName,
		"lastName": req.body.lastName,
		"email": req.body.email,
		"rides": "3",
		"rating": {},
		"requests": {}
	}


	data.users[req.body.username] = newUser;
	var days = data.days
	console.log(days)
	data.schedule[req.body.username] = {'days': days,
										'username': req.body.username
										};

	req.session["username"] = req.body.username;
	res.redirect('/homepage');
}