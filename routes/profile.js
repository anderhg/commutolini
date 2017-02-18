var data = require('../data.json');

exports.viewProfile = function(req, res) {
	if (data.currentUser.firstName == undefined){
	res.redirect('/');
	}
	res.render('profile', data);
};