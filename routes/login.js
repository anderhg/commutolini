var data = require('../data.json');

exports.viewLogin = function(req, res) {
	if (data.currentUser.firstName != undefined){
		res.redirect('/homepage');
		return;
	}

	res.render('login');
}