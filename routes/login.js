var data = require('../data.json');

exports.viewLogin = function(req, res) {

	if (req.session["username"] != undefined){
		res.redirect('/homepage');
		return;
	}

	res.render('login');
}