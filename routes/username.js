var data = require("../data.json");


exports.login = function(req, res) {  
	

	var username = req.body.username;
	console.log(username)


	if (data.users[username] != undefined){
		req.session.username = username;
		req.session.save();
		data.sessions[username] = data.users[username];
		console.log(req.session);
	}


}

exports.logoff = function(req, res) {   
	req.session.destroy();
}


exports.register = function(req, res) {
	
}