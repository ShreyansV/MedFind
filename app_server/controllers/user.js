var request = require('request');
var apiOptions = {server: "http://localhost:3000"};

var userDetails;

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

module.exports.order = function(req, res){
	res.render('orderPage',{
		title: 'MedFind'
	});
};

/*Place Order Page*/
module.exports.placeOrder = function(req, res){
  if(req.params.userid && req.params.shopid){
    var requestOptions, path;
		path = '/api/user/' + req.params.userid + '/' + req.params.shopid + '/placeOrder';
		requestOptions = {
			url: apiOptions.server + path,
			method: "POST"
		};

		request(requestOptions, function(err, response, data){
			if(response.statusCode == 201){
				userDetails.userOrders = data;
			}
			res.redirect('/user/' + req.params.userid + '/' + req.params.shopid + '/order');
		});
	}
	else{
		res.redirect('/user/' + req.params.userid + '/' + req.params.shopid + '/order');
	}
};

/*userDetails Page*/
module.exports.editDetails = function(req, res){
	res.render('editUserDetails',{
		title: 'MedFind',
		user: userDetails
	});
};

/*confirm Details*/
module.exports.confirmDetails = function(req, res){
  var requestOptions, path;
	path = '/api/userEditDetails/';
	requestOptions = {
		url: apiOptions.server + path,
		method: 'PUT',
	};
	request(requestOptions, function(err, response, body){
		if(response.statusCode == 202){
			userDetails = body;
			res.redirect('/user');
		}
		else{
			_showError(req, res, response.statusCode);
		}
	});
};

/*show userDetails*/
module.exports.showDetails = function(req, res){
	res.render('showUserDetails',{
		title: 'MedFind',
		user: userDetails
	});
};

/*order history of user*/
module.exports.orderHistory = function(req, res){
  var requestOptions, path;
	path = '/api/user/' + req.body._id + '/getOrderHistory';
	requestOptions = {
		url: apiOptions.server + path,
		method: 'GET'
	};
	request(requestOptions, function(err, response, orders){
		if(response.statusCode == 200){
			res.render('userOrderHistory',{
				title: 'MedFind',
				orderHistory: orders
			});
		}
		else{
      _showError(req, res, response.statusCode);
		}
	});
};

/*Logout Page*/
module.exports.logout = function(req, res){
	userDetails = null;
	res.redirect('/entry');
}

/*login*/
module.exports.login = function(req, res){
  res.render('login',{
		title: 'MedFind'
	});
};

/*Verify Login Credentials*/
module.exports.checkLogin = function(req, res){
  //Fetch details of user
	if(req.body.email && req.body.password){
		var requestOptions, path;
		path = '/api/checkUserLogin';
		requestOptions = {
			url: apiOptions.server + path,
			method: "GET"
		};
		request(requestOptions, function(err, response, shop){
			if(response.statusCode == 200){
				shopDetails = shop;
				res.redirect('/user');
			}
			else{
				res.redirect('/loginUser?err=val');
			}
		});
	}
	else{
	  res.redirect('/loginUser?err=val');
	}
};

/*Sign In Form*/
module.exports.signInUser = function(req, res){
  res.render('signInUser',{
		title: 'MedFind'
	});
};

/*Creating New User*/
module.exports.create = function(req, res){
  var requestOptions, path;
	path = '/api/userCreate';
	requestOptions = {
		url: apiOptions.server + path,
		method: "POST"
	};
	request(requestOptions, function(err, response, body){
		if(response.statusCode == 201){
			res.redirect('/loginUser');
		}
		else{
			_showError(req, res, response.statusCode);
		}
	});
};

var getShopInfo = function(req, res, callback){
	var requestOptions, path;
	path = '/api/shops/' + req.params.shopid;
	requestOptions = {
		url: apiOptions.server + path,
		method: "GET",
		json: {},
		qs:{}
	};

	request(requestOptions, function(err, response, body){
		if(response.statusCode == 200){
	  	body.coords = {
		  	lng: body.coords[0],
			  lat: body.coords[1]
		  };
			callback(req, res, body);
	  }
		else{
			_showError(req, res, response.statusCode);
		}
	});
}

/* GET 'home' page */
var renderHomePage = function(req, res, body){
	var message;
	if(!(body instanceof Array)){
		message = "API Lookup Error";
		body = [];
	}
	else if(!body.length){
		  message = "No places found nearby";
	}
	res.render('shopList', {
		title: 'MedFind',
		pageHeader:{
	   title: 'MedFind',
	   strapline:'Find Medical Store nearby'
	  },
    shops: body,
		side: {
		  text: 'MedFind helps you find medical stores near you in seconds!!'
		},
		message: message
	});
};

module.exports.shopList = function(req, res, next){
  var requestOptions, path;
	path = '/api/shops';
	requestOptions = {
		url: apiOptions.server + path,
		method: "GET",
		json: {},
		qs: {
			lng: 0.965748,
			lat: 22.254637,
		}
	};

	var formatDistance = function(distance){
		var numDistance, unit;
		if(distance > 1){
			numDistance = parseFloat(distance).toFixed(1);
			unit = "km";
		}
		else{
			numDistance = parseInt(distance*1000, 10);
			unit = "m";
		}
		return numDistance + unit;
	};

	request(requestOptions, function(err, response, body){
		var i;
		/*if(response.statusCode == 200 && body.length){
		  for(i=0;i<body.length;i++){
		    body[i].distance = formatDistance(body[i].distance);
			}
		}*/
		renderHomePage(req, res, body);
	});
};

/* GET 'Location info' page */
var renderShopInfo = function(req, res, body){
	var message;
	res.render('shopInfo', {
		title: 'MedFind',
		sidebar: 'This is a website for finding and ordering medicines near you!!',
    shopDetail: body
	});
}

module.exports.shopInfo = function(req, res){
  getShopInfo(req, res, function(req, res, responseData){
		renderShopInfo(req, res, responseData);
	});
};

/* Add Review page */
var renderReviewPage = function(req, res, body){
	res.render('shopReviewForm',{
		_id: body._id,
		title: 'Review ' + body.medicalShopName,
		medicalShopName: body.medicalShopName,
		error: req.query.err
	});
};

module.exports.addReview = function(req, res){
	getShopInfo(req, res, function(req, res, responseData){
		renderReviewPage(req, res, responseData);
	});
};

/* Post Method for submitting the form*/
module.exports.doAddReview = function(req, res){
  var requestOptions, path;
	var data = {
		reviewerName: req.body.name,
		ratings: req.body.rating,
		reviewText: req.body.review,
	};
  path = "/api/locations/" + req.params.shopid + '/reviews';
	requestOptions = {
		url: apiOptions.server + path,
		method: "POST",
		json: data
	};
	if(!data.reviewerName || !data.ratings){
		res.redirect('/shop/' + req.params.shopid + '/reviews/new?err=val');
	}
	request(requestOptions, function(err, response, body){
		if(response.statusCode == 201){
			res.redirect('/shop/' + req.params.shopid);
		}
		else if(response.statusCode == 400 && body.name && body.name == "ValidationError"){
			res.redirect('/shop/' + req.params.shopid + '/reviews/new?err=val');
		}
		else{
			_showError(req, res, response.statusCode);
		}
	});
};

/*Deleting User*/
module.exports.delete = function(req, res){
  var requestOptions, path;
	path = '/api/user/' + req.params.userid + '/delete';
	requestOptions = {
		url: apiOptions.server + path,
		method: "DELETE"
 	};
	request(requestOptions, function(err, response, data){
		if(response.statusCode == 204){
			userDetails = {};
			res.redirect('/loginUser');
		}
		else{
			_showError(req, res, response.statusCode);
		}
	});
};
