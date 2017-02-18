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
				"start": req.query.MStart,
				"end": req.query.MEnd,
				"seats": req.query.MSeats
			},
			{
				"day": "Tuesday",
				"code": "Tu",
				"id": "collapseTwo",
				"start": req.query.TuStart,
				"end": req.query.TuEnd,
				"seats": req.query.TuSeats
			},
			{
				"day": "Wednesday",
				"code": "W",
				"id": "collapseThree",
				"start": req.query.WStart,
				"end": req.query.WEnd,
				"seats": req.query.WSeats
			},
			{
				"day": "Thursday",
				"code": "Th",
				"id": "collapseFour",
				"start": req.query.ThStart,
				"end": req.query.ThEnd,
				"seats": req.query.ThSeats
			},
			{
				"day": "Friday",
				"code": "F",
				"id": "collapseFive",
				"start": req.query.FStart,
				"end": req.query.FEnd,
				"seats": req.query.FSeats
			}
		]

	var currentUser = data.currentUser.username;

	
	if(data.schedule.hasOwnProperty(currentUser)){
		delete data.schedule.currentUser;
	}

	data.schedule[currentUser].days = newSchedule;
	res.render('schedule', data);
}