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
  
};

/*Edit Delivery Boy details*/
module.exports.editDetails = function(req, res){
  //Fetch Details of Boy
	res.render('editBoyDetails',{
		title: 'MedFind'
	});
};

/*Update Delivery boy details*/
module.exports.confirmDetails = function(req, res){

};

/*Work Details of the delivery boy*/
module.exports.workDetails = function(req, res){
  //Fetch orders for him
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
  //Fetch boy details
	if(!body){
		res.redirect('/logindboy?err=val');
	}
	else if((body.userName == req.body.name || body.userName == req.body.email) && body.userPassword == req.body.password){
		boyDetails = body;
		res.redirect('/dboy/:dboyid/workDetails');
	}
	else{
		res.redirect('/logindboy?err=val');
	}
};

/*Deleting User*/
module.exports.delete = function(req, res){

};
