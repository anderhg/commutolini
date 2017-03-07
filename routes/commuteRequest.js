var data = require('../data.json');

exports.sendRequest = function(req, res){
	
	var request = {
		"sender": req.body.sender,
		"receiver": req.body.receiver,
		"Monday": req.body.monday,
		"Tuesday": req.body.tuesday,
		"Wednesday": req.body.wednesday,
		"Thursday": req.body.thursday,
		"Friday": req.body.friday
	};

	var sender = req.body.sender;
	data.users[req.body.receiver].requests[sender] = request;
}