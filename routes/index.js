
/*
 * GET home page.
 */
var data = require('../data.json');

exports.view = function(req, res){
	if (data.currentUser.firstName == undefined){
	res.redirect('/');
	}

  res.render('index', data);
};