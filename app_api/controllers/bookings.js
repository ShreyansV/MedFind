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

module.exports.placeOrder = function(req, res){

};

module.exports.confirmOrder = function(req, res){

};
