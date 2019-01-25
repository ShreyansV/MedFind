var mongoose = require('mongoose');

var medicines = mongoose.model('Medicine');
var address = mongoose.model('Addres');
var order = mongoose.model('Order');
var payslip = mongoose.model('Payslip');
var user = mongoose.model('User');
var shop = mongoose.model('Shop');

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
}

module.exports.showDeliveryLocations = function(req, res){

};

module.exports.editDeliveryBoyDetails = function(req, res){

};

module.exports.showSalaryHistory = function(req, res){

};
