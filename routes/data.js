var data = require('../data.json');

exports.dataInfo = function(req, res) { 
	console.log(data)
  	res.json(data);
}