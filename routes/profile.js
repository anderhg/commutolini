var data = require('../data.json');

exports.viewProfile = function(req, res) {
	if (data.currentUser.firstName == undefined){
		res.redirect('/');
		return;
	}
	res.render('profile', data);
};