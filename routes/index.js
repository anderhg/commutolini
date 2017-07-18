
/*
 * GET home page.
 */
var data = require('../data.json');

exports.view = function(req, res){
	console.log(req.session);
	console.log(Object.keys(data.users));
	var username = req.session["username"];

	if (username == undefined){
		console.log('not in list');
		res.redirect('/');
		return;
	}else{
		console.log('in list');
		var fakeData = JSON.parse(JSON.stringify(data));
		fakeData.currentUser = fakeData.users[username];
		res.render('index', fakeData);
	}

};