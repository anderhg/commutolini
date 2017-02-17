var data = require("../data.json");


exports.login = function(req, res) {    
	
	console.log(req.body.username);

	var username = req.body.username;
	data.data.currentUser = username;

	var loggedInUser = data.data.users[username];

	data.data.currentUser = loggedInUser;

	console.log(data);



 }