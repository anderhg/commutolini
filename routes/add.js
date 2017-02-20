var data = require("../data.json");


exports.addSchedule = function(req, res) { 

	if (req.session.username == undefined){
		console.log('hjsdf');
		res.redirect('/');
		return;
	}

	console.log('no');

	var newSchedule = [
			{
				"day": "Monday",
				"code": "M",
				"id": "collapseOne",
				"start": req.body.MStart,
				"end": req.body.MEnd,
				"seats": req.body.MSeats
			},
			{
				"day": "Tuesday",
				"code": "Tu",
				"id": "collapseTwo",
				"start": req.body.TuStart,
				"end": req.body.TuEnd,
				"seats": req.body.TuSeats
			},
			{
				"day": "Wednesday",
				"code": "W",
				"id": "collapseThree",
				"start": req.body.WStart,
				"end": req.body.WEnd,
				"seats": req.body.WSeats
			},
			{
				"day": "Thursday",
				"code": "Th",
				"id": "collapseFour",
				"start": req.body.ThStart,
				"end": req.body.ThEnd,
				"seats": req.body.ThSeats
			},
			{
				"day": "Friday",
				"code": "F",
				"id": "collapseFive",
				"start": req.body.FStart,
				"end": req.body.FEnd,
				"seats": req.body.FSeats
			}
		]

	var currentUser = req.session.username;

	data.schedule[currentUser].days = newSchedule;
	data.users[currentUser].home = req.body.home;
	data.users[currentUser].destination = req.body.destination;

	var fakeData = JSON.parse(JSON.stringify(data));
	fakeData.currentUser = fakeData.users[currentUser];
	res.render('schedule', fakeData);
}