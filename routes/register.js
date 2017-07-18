var data = require('../data.json');

exports.viewRegister = function(req, res) {

	if (req.session["username"] != undefined){
		res.redirect('/homepage');
		return;
	}

	res.render('register');
}