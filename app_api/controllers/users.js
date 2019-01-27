var mongoose = require('mongoose');

var medicines = mongoose.model('Medicine');
var address = mongoose.model('Addres');
var order = mongoose.model('Order');
var user = mongoose.model('User');
var shop = mongoose.model('Shop');

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
}

/*Get User Details*/
module.exports.getDetails = function(req, res){
  user.findById().select('userEmail').exec(function(err, user){
    if(!user){
      sendJsonResponse(res, 404, {"message": "User Not Found"});
      return;
    }
    else if(err){
      sendJsonResponse(res, 404, err);
      return;
    }
    sendJsonResponse(res, 200, user);
  });
};

/*create User*/
module.exports.create = function(req, res){
  if(!(req.body.name || req.body.password || req.body.email || req.body.address)){
    sendJsonResponse(res, 400, {"message": "Details not filled properly"});
  }
  else{
    user.create({
      userName: req.body.name,
      userPassword: req.body.password,
      userEmail: req.body.email,
      userAddress: req.body.address
    }, function(err, user){
      if(err){
        sendJsonResponse(res, 400, err);
      }
      else{
        sendJsonResponse(res, 201, user);
      }
    });
  }
};

module.exports.showMedicinesAtShop = function(req, res){

};

module.exports.editUserDetails = function(req, res){

};

module.exports.showUserOrderHistory = function(req, res){

};
