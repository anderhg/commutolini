var users = require('../data.json');

exports.usersInfo = function(req, res) { 
	var projectID = req.params.id;
	if (projectID == "random") {
		projectID = Math.floor(Math.random() * projects.length) + 1;
	} else {
		projectID = parseInt(projectID);
	}

  	var user = users["users"]; // of by one, our first project has index 0
  	res.json(users);
}