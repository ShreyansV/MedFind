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
		order: shopDetails.shopOrders
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
  var requestOptions, path;
	path = '/api/shop/' + req.params.shopid + '/confirmDetails';
	requestOptions = {
		url: apiOptions.server + path,
		method: "POST"
	};
	request(requestOptions, function(err, response, body){
		if(response.statusCode == 203){
			shopDetails = body;
			res.redirect('/shop/' + shopDetails._id + '/showDetails');
		}
		else{
			_showError(req, res, response.statusCode);
		}
	});
};

/*medicine form page*/
module.exports.medicineForm = function(req, res){
  res.render('addMedicine',{
		title: 'MedFind',
		shopDetails: shopDetails
	});
};

/*Add Medicines to the shop*/
module.exports.addMedicine = function(req, res){
  var requestOptions, path;
	path = '/api/shop/' + req.params.shopid + '/addMedicine';
	requestOptions = {
		url: apiOptions.server + path,
		method: 'POST'
	};
	request(requestOptions, function(err, response, body){
    if(response.statusCode == 202){
			res.redirect('/shop/' + req.params.shopid + '/details');
		}
		else{
			_showError(req, res, response.statusCode);
		}
	});
};

/*Show medicines in the shop*/
module.exports.showMedicinesAtShop = function(req, res){
	res.render('showMedicines',{
		title: 'MedFind',
		medicines: shopDetails.shopMedicines
	});
};

/*Show Details*/
module.exports.showDetails = function(req, res){
  res.render('shopShowDetails',{
		title: 'MedFind',
		shop: shopDetails
	});
};

/*Login Page*/
module.exports.login = function(req, res){
	res.render('login', {
		title: 'MedFind',
	});
};

/*Verify Credentials*/
module.exports.checkLogin = function(req, res){
	if(req.body.email && req.body.password){
		var requestOptions, path;
		path = '/api/checkShopLogin';
		requestOptions = {
			url: apiOptions.server + path,
			method: "GET"
		};
		request(requestOptions, function(err, response, shop){
			if(response.statusCode == 200){
				shopDetails = shop;
				res.redirect('/shop/' + shopDetails._id + '/showDetails');
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

/*Deleting Shop*/
module.exports.delete = function(req, res){
  var requestOptions, path;
	path = '/api/shops/' + req.params.shopid;
	requestOptions = {
    url: apiOptions.server + path,
		method: "DELETE"
	};
	request(requestOptions, function(err, response, data){
		if(response.statusCode == 204){
			res.redirect('/entry');
		}
		else{
      _showError(req, res, response.statusCode);
		}
	});
};

/*Deleting Medicine at shop*/
module.exports.deleteMedicine = function(req, res){
  if(!(req.params.shopid || req.params.medicineid)){
		res.redirect('/shop/' + shopDetails._id + '/showMedicines?err=val');
	}
	else{
     var requestOptions, path;
		 path = '/api/shop/' + shopDetails._id + '/' + req.params.medicineid + '/deleteMedicine';
		 requestOptions = {
			 url: apiOptions.server + path,
			 method: "DELETE"
		 };
		 request(requestOptions, function(err, response, medicines){
			 if(response.statusCode == 204){
				 shopDetails.shopMedicines = medicines;
				 res.redirect('/shop/' + shopDetails._id + '/showMedicines?err=val');
			 }
			 else{
				 _showError(req, res, response.statusCode);
			 }
		 });
	}
};
