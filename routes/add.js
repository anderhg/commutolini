var data = require("../data.json");


exports.addSchedule = function(req, res) { 

	if (data.currentUser.firstName == undefined){
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

	var currentUser = data.currentUser.username;

	
	if(data.schedule.hasOwnProperty(currentUser)){
		delete data.schedule.currentUser;
	}

	data.schedule[currentUser].days = newSchedule;
	res.render('schedule', data);
}