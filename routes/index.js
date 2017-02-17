
/*
 * GET home page.
 */
var data = require('../drivecard.json');

exports.view = function(req, res){
  res.render('index', data);
};