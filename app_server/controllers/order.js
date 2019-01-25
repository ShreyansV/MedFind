var request = require('request');
var apiOptions = {server: "http://localhost:3000"};

var _showError = function(req, res, statusCode){
	var title, content;
	if(statusCode == 404){
		title = "404, Page not found!!";
		content = "Looks like we can't find the Page. Sorry!!";
	}
	else{
		title = statusCode + ", something's gone wrong!!";
		content = "Something has just gone wrong. Go to homepage ->";
	}
	res.status(statusCode);
	res.render('generic-text', {
		title: title,
		content: content
	});
};

/*Order Page*/
module.exports.order = function(req, res){
  //Fetch Details of the shop attributes to place order
	res.render('orderPage',{
		title: 'MedFind',
	});
};

/*Place Order Page*/
module.exports.placeOrder = function(req, res){

};
