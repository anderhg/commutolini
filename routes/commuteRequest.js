var data = require('../data.json');

exports.sendRequest = function(req, res){
	

	var sender = req.body.sender;
	var receiver = req.body.receiver;

	var request = {
		"sender": sender,
		"receiver": receiver,
		"start": "",
		"end": "",
		"day": ""
	}
	data.users[receiver].requests = [] 



	if (req.body.monday == 1){
		var fakeData = JSON.parse(JSON.stringify(request));
		fakeData.day = 'Monday';
		fakeData.start = data.schedule[receiver].days[0].start;
		fakeData.end = data.schedule[receiver].days[0].end;
		data.users[receiver].requests.push(fakeData);
		data.users[sender].rides -= 1;
	}
	if (req.body.tuesday == 1){
		var fakeData = JSON.parse(JSON.stringify(request));
		fakeData.day = 'Tuesday';
		fakeData.start = data.schedule[receiver].days[1].start;
		fakeData.end = data.schedule[receiver].days[1].end;
		data.users[receiver].requests.push(fakeData);
		data.users[sender].rides -= 1;
	}
	if (req.body.wednesday == 1){
		var fakeData = JSON.parse(JSON.stringify(request));
		fakeData.day = 'Wedensday';
		fakeData.start = data.schedule[receiver].days[2].start;
		fakeData.end = data.schedule[receiver].days[2].end;
		data.users[receiver].requests.push(fakeData);
		data.users[sender].rides -= 1;
	}
	if (req.body.thursday == 1){
		var fakeData = JSON.parse(JSON.stringify(request));
		fakeData.day = 'Thursday';
		fakeData.start = data.schedule[receiver].days[3].start;
		fakeData.end = data.schedule[receiver].days[3].end;
		data.users[receiver].requests.push(fakeData);
		data.users[sender].rides -= 1;
	}
	if (req.body.friday == 1){
		var fakeData = JSON.parse(JSON.stringify(request));
		fakeData.day = 'Friday';
		fakeData.start = data.schedule[receiver].days[4].start;
		fakeData.end = data.schedule[receiver].days[4].end;
		data.users[receiver].requests.push(fakeData);
		data.users[sender].rides -= 1;
	}

	res.redirect("/browse");

}

exports.acceptRequest = function(req, res){
	

	var sender = req.body.sender;
	var receiver = req.body.receiver;
	var day = req.body.day;
	var start = req.body.start;
	var end = req.body.end;

	var request = {
		"sender": sender,
		"receiver": receiver,
		"start": start,
		"end": end,
		"day": day
	}



	if (data.users[receiver].acceptedRequests == undefined){
		data.users[receiver].acceptedRequests = [request];
	}else{
		data.users[receiver].acceptedRequests.push(request);
	}

	if (data.users[sender].passengerRides == undefined){
		data.users[sender].passengerRides = [request];
	}else{
		data.users[sender].passengerRides.push(request);
	}

	if (day=='Monday'){
		var rideInt = parseInt(data.schedule[receiver].days[0].seats);
		rideInt -= 1;
		data.schedule[receiver].days[0].seats = ""+rideInt;
	}
	if (day=='Tuesday'){
		var rideInt = parseInt(data.schedule[receiver].days[1].seats);
		rideInt -= 1;
		data.schedule[receiver].days[1].seats = ""+rideInt;
	}
	if (day=='Wednesday'){
		var rideInt = parseInt(data.schedule[receiver].days[2].seats);
		rideInt -= 1;
		data.schedule[receiver].days[2].seats = ""+rideInt;
	}
	if (day=='Thursday'){
		var rideInt = parseInt(data.schedule[receiver].days[3].seats);
		rideInt -= 1;
		data.schedule[receiver].days[3].seats = ""+rideInt;
	}
	if (day=='Friday'){
		var rideInt = parseInt(data.schedule[receiver].days[4].seats);
		rideInt -= 1;
		data.schedule[receiver].days[4].seats = ""+rideInt;
	}

	data.users[receiver].rides += 1;
	deleteObjectFromRequests(sender, receiver, day);
	console.log("haha");
	res.redirect("/homepage");

}

exports.declineRequest = function(req, res){
	

	var sender = req.body.sender;
	var receiver = req.body.receiver;
	var day = req.body.day;
	var start = req.body.start;
	var end = req.body.end;

	data.users[sender].rides += 1;
	deleteObjectFromRequests(sender, receiver, day);
	console.log("haha");
	res.redirect("/homepage");

}

function deleteObjectFromRequests(sender, receiver, day){
	var list = 	data.users[receiver].requests;
	var i = 0;
	list.forEach(function(element) {
    
		if (element.sender == sender && element.receiver == receiver && element.day == day){
			list.splice(i,1);
		}else{
			i++;
		}

	});

}

