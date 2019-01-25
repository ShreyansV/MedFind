var request = require('request');
var apiOptions = {server: "http://localhost:3000"};

/*Entry Page*/
module.exports.entry = function(req, res){
	res.render('entry', {
		title: 'MedFind',
	});
};
