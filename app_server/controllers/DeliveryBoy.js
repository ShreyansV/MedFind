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

/*Logout Page*/
module.exports.logout = function(req, res){
	boyDetails = null;
	res.redirect('/entry');
}

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

/*Show Details*/
module.exports.showDetails = function(req, res){
	res.render('showBoyDetails',{
		title: 'MedFind',
		boyDetails: boyDetails
	});
};

/*Edit Delivery Boy details*/
module.exports.editDetails = function(req, res){
	res.render('editBoyDetails',{
		title: 'MedFind',
		boyDetails: boyDetails
	});
};

/*Update Delivery boy details*/
module.exports.confirmDetails = function(req, res){
  if(req.params.dboyid){
    var requestOptions, path;
		path = '/api/boy/' + req.params.dboyid + '/confirmDetails';
		requestOptions = {
			url: apiOptions.server + path,
			method: "POST"
		};
		request(requestOptions, function(err, response, data){
			if(response.statusCode == 202){
				boyDetails = data;
				res.redirect('/dboy/' + boyDetails._id + '/workDetails');
			}
			else{
				res.render('editBoyDetails',{
					title: 'MedFind',
					boyDetails: boyDetails
				});
			}
		});
	}
	else{
		res.render('editBoyDetails',{
			title: 'MedFind',
			boyDetails: boyDetails
		});
	}
};

/*Work Details of the delivery boy*/
module.exports.workDetails = function(req, res){
	res.render('boyDetails',{
		title: 'MedFind',
		orders: boyDetails.boyOrders
	});
};

/*Show Payslip Date-wise*/
module.exports.showPayslip = function(req, res){
	res.render('showPayslip',{
		title: 'MedFind',
		payslips: boyDetails.boyPayslips
	});
};

/*Login Page*/
module.exports.login = function(req, res){
  res.render('login',{
		title: 'MedFind'
	});
};

/*Checking Credentials*/
module.exports.checkLogin = function(req, res){
	if(req.body.email && req.body.password){
		var requestOptions, path;
		path = '/api/checkBoyLogin';
		requestOptions = {
			url: apiOptions.server + path,
			method: "GET"
		};
		request(requestOptions, function(err, response, shop){
			if(response.statusCode == 200){
				shopDetails = shop;
				res.redirect('/dboy/' + boyDetails._id + '/workDetails');
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
