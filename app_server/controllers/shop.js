var request = require('request');
var apiOptions = {server: "http://localhost:3000"};

var shopDetails;

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

/*Shop Order History*/
module.exports.orderHistory = function(req, res){
	res.render('shopOrderHistory',{
		title: 'MedFind',
		order: body
	});
};

/*Sign In page for shop*/
module.exports.signIn = function(req, res){
  res.render('signInShop',{
		title: 'MedFind'
	});
};

/*Creating Shop Location*/
module.exports.create = function(req, res){
  var requestOptions, path;
	path = '/api/shopsCreate';
	requestOptions = {
		url: apiOptions.server + path,
		method: "POST"
	};
	request(requestOptions, function(err, response, body){
		if(response.statusCode == 201){
			res.redirect('/loginShop');
		}
		else{
			_showError(req, res, response.statusCode);
		}
	});
};

/*Edit Shop Details*/
module.exports.editDetails = function(req, res){
  res.render('shopEditDetails',{
		title: 'MedFind',
		shop: shopDetails
	});
};

/*Confirm Shop Details*/
module.exports.confirmDetails = function(req, res){

};

/*Show Details*/
module.exports.showDetails = function(req, res){
  res.render('shopShowDetails',{
		title: 'MedFind',
		shop: body
	});
};

/*Login Page*/
module.exports.login = function(req, res){
	res.render('loginShop', {
		title: 'MedFind',
	});
};

/*Verify Credentials*/
module.exports.checkLogin = function(req, res){
  //Fetch Shop Details
	if(!body){
		res.redirect('/loginShop?err=val');
	}
	else if((body.userName == req.body.name || body.userName == req.body.email) && body.userPassword == req.body.password){
		var requestOptions, path;
		path = '/api/shops/' + req.params.email;
		requestOptions = {
			url: apiOptions.server + path,
			method: "GET",
			json: {},
			qs: {}
		};
		request(requestOptions, function(err, response, shop){
			if(response.statusCode == 200){
				shopDetails = shop;
				res.redirect('/shop/:shopid/showDetails');
			}
			else{
				res.redirect('/loginShop?err=val');
			}
		});
	}
	else{
		res.redirect('/loginShop?err=val');
	}
};

/*Deleting User*/
module.exports.delete = function(req, res){

};

/*Deleting User*/
module.exports.deleteMedicine = function(req, res){

};
