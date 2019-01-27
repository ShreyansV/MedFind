var request = require('request');
var apiOptions = {server: "http://localhost:3000"};

var boyDetails;

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

/*Create Delivery Boy*/
module.exports.signIn = function(req, res){
  res.render('signInBoy',{
		title: 'MedFind'
	});
};

/*Create DeliveryBoy*/
module.exports.create = function(req, res){
  var requestOptions, path;
	path = '/api/boyCreate/' + req.params.shopid;
	requestOptions = {
		url: apiOptions.server + path,
		method: 'POST',
		json: {},
		qs: {}
	};
	request(requestOptions, function(err, response, body){
		if(response.statusCode == 201){
			res.redirect('/logindboy');
		}
		else{
			_showError(req, res, response.statusCode);
		}
	});
};

/*Edit Delivery Boy details*/
module.exports.editDetails = function(req, res){
	res.render('editBoyDetails',{
		title: 'MedFind'
	});
};

/*Update Delivery boy details*/
module.exports.confirmDetails = function(req, res){

};

/*Work Details of the delivery boy*/
module.exports.workDetails = function(req, res){
	res.render('boyDetails',{
		title: 'MedFind'
	});
};

/*Payslip page*/
module.exports.payslipPage = function(req, res){
  //Fetch the details of Payslip page
	res.render('payslipForm',{
		title: 'MedFind'
	});
};

/*Show Payslip Date-wise*/
module.exports.showPayslip = function(req, res){
  //Fetch the payslip details
	res.render('showPayslip',{
		title: 'MedFind'
	});
};

/*Login Page*/
module.exports.login = function(req, res){
  res.render('loginBoy',{
		title: 'MedFind'
	});
};

/*Checking Credentials*/
module.exports.checkLogin = function(req, res){
	if(!body){
		res.redirect('/logindboy?err=val');
	}
	else if((body.userName == req.body.name || body.userName == req.body.email) && body.userPassword == req.body.password){
    var requestOptions, path;
		path = '/api/dboyDetails/' + req.params.email;
		requestOptions = {
      url: apiOptions.server + path,
			json: {},
			qs: {},
			method: "GET"
		};
		request(requestOptions, function(err, body, response){
			if(response.statusCode == 200){
				boyDetails = body;
				console.log(boyDetails);
				res.redirect('/dboy/:dboyid/workDetails');
			}
			else{
				res.redirect('/logindboy?err=val');
			}
		});
	}
	else{
		res.redirect('/logindboy?err=val');
	}
};

/*Deleting User*/
module.exports.delete = function(req, res){

};
