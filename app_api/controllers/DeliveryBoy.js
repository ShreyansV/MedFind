var mongoose = require('mongoose');

var medicines = mongoose.model('Medicine');
var address = mongoose.model('Addres');
var order = mongoose.model('Order');
var payslip = mongoose.model('Payslip');
var user = mongoose.model('User');
var shop = mongoose.model('Shop');
var boy = mongoose.model('Boy');

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
}

module.exports.createAccount = function(req, res){
  //duplicacy check
  boy.findById().select('boyEmailId').exec(function(err, boy){
    if(!boy){
      //create account
    }
    else if(err){
      sendJsonResponse(res, 400, err);
    }
    else{
      sendJsonResponse(res, 300, {"message": "Duplicate Record"});
    }
  });
};

module.exports.showDeliveryLocations = function(req, res){

};

module.exports.editDeliveryBoyDetails = function(req, res){

};

module.exports.showSalaryHistory = function(req, res){

};
