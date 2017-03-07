var data = require('../data.json');

exports.sendRequest = function(req, res){
	

	var sender = req.body.sender;
	var receiver = req.body.receiver;

	var request = {
		"sender": sender,
		"receiver": receiver,
		"day": ""
	}
	data.users[receiver].requests = [] 



	if (req.body.monday == 1){
		var fakeData = JSON.parse(JSON.stringify(request));
		fakeData.day = 'Monday';
		data.users[receiver].requests.push(fakeData);
	}
	if (req.body.tuesday == 1){
		var fakeData = JSON.parse(JSON.stringify(request));
		fakeData.day = 'Tuesday';
		data.users[receiver].requests.push(fakeData);
	}
	if (req.body.wednesday == 1){
		var fakeData = JSON.parse(JSON.stringify(request));
		fakeData.day = 'Wedensday';
		data.users[receiver].requests.push(fakeData);
	}
	if (req.body.thursday == 1){
		var fakeData = JSON.parse(JSON.stringify(request));
		fakeData.day = 'Thursday';
		data.users[receiver].requests.push(fakeData);
	}
	if (req.body.friday == 1){
		var fakeData = JSON.parse(JSON.stringify(request));
		fakeData.day = 'Friday';
		data.users[receiver].requests.push(fakeData);
	}

}