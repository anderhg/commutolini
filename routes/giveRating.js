var data = require("../data.json");


exports.giveRating = function(req, res) { 

	if (req.session["username"] == undefined){
		res.redirect('/');
		return;
	}

	console.log('got here');

	var rating = req.body.stars;
	rating = parseInt(rating);

	var giver = req.body.giver;
	var receiver = req.body.receiver;

	console.log(rating);
	console.log(giver);
	console.log(receiver);

	data.users[receiver].rating[giver] = rating;

}