var data = require("../data.json");


exports.login = function(req, res) {   
	
	console.log(req.body.username);

	var username = req.body.username;
	data.currentUser = username;

	var loggedInUser = data.users[username];

	data.currentUser = loggedInUser;

	console.log(data);



}