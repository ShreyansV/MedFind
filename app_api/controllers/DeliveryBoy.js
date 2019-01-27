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
  if(!(req.body.name || req.body.password || req.body.email)){
    sendJsonResponse(res, 400, {"message": "Details not filled properly"});
  }
  else{
    boy.create({
      boyName: req.body.name,
      boyPassword: req.body.password,
      boyEmailId: req.body.email
    }, function(err, boy){
      if(err){
        sendJsonResponse(res, 404, err);
      }
      else{
        sendJsonResponse(res, 201, boy);
      }
    });
  }
};

module.exports.showDeliveryLocations = function(req, res){

};

module.exports.editDeliveryBoyDetails = function(req, res){

};

module.exports.getDetails = function(req, res){
  //get Delivery Boy Details
  boy.findById().select('boyEmailId').exec(function(err, body){
    if(!boy){
      sendJsonResponse(res, 404, {"message": "Record Not Found"});
      return;
    }
    else if(err){
      sendJsonResponse(res, 400, {"message": "Error"});
      return;
    }
    sendJsonResponse(res, 200, body);
  });
};

module.exports.showSalaryHistory = function(req, res){

};
