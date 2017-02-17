var data = require("../data.json");


exports.addSchedule = function(req, res) {    
	var days = [
			{
				"name": "Monday",
				"code": "M",
				"id": "collapseOne",
				"start": req.query.MStart,
				"end": req.query.MEnd,
				"seats": req.query.MSeats
			},
			{
				"name": "Tuesday",
				"code": "Tu",
				"id": "collapseTwo",
				"start": req.query.TuStart,
				"end": req.query.TuEnd,
				"seats": req.query.TuSeats
			},
			{
				"name": "Wednesday",
				"code": "W",
				"id": "collapseThree",
				"start": req.query.WStart,
				"end": req.query.WEnd,
				"seats": req.query.WSeats
			},
			{
				"name": "Thursday",
				"code": "Th",
				"id": "collapseFour",
				"start": req.query.ThStart,
				"end": req.query.ThEnd,
				"seats": req.query.ThSeats
			},
			{
				"name": "Friday",
				"code": "F",
				"id": "collapseFive",
				"start": req.query.FStart,
				"end": req.query.FEnd,
				"seats": req.query.FSeats
			}
		]

	var currentUser = data.currentUser.username;

	var newSchedule = 	{
					"username": currentUser,
					"days": [{
							"day": "Monday",
							"start": req.query.MStart,
							"end": req.query.MEnd,
							"seats": req.query.MSeats
								},
								{
							"day": "Tuesday",
							"start": req.query.TuStart,
							"end": req.query.TuEnd,
							"seats": req.query.TuSeats
								},
								{
							"day": "Wednesday",		
							"start": req.query.WStart,
							"end": req.query.WEnd,
							"seats": req.query.WSeats
								},
								{
							"day": "Thursday",		
							"start": req.query.ThStart,
							"end": req.query.ThEnd,
							"seats": req.query.ThSeats
								},
								{
							"day":	"Friday",	
							"start": req.query.FStart,
							"end": req.query.FEnd,
							"seats": req.query.FSeats
							}
							]
						}	
	
	if(data.schedule.hasOwnProperty(currentUser)){
		delete data.schedule.currentUser;
	}
	delete data.days;
	data.days = days;
	data.schedule[currentUser] = newSchedule;
	res.render('schedule', data);
}