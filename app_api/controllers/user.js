var mongoose = require('mongoose');

var user = mongoose.model('User');
var shop = mongoose.model('Shop');
var boy = mongoose.model('Boy');

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
}

/*Get User Details*/
module.exports.checkLogin = function(req, res){
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

/*Edit User Details*/
module.exports.editUserDetails = function(req, res){
  user.findById(req.body._id).exec(function(err, userDetails){
    if(!user){
      sendJsonResponse(res, 404, {"message": "User Not Found"});
    }
    else if(err){
      sendJsonResponse(res, 400, err);
    }
    else{
      userDetails.userName = req.body.name;
      userDetails.userPassword = req.body.password;
      userDetails.userEmailId = req.body.email;
      userDetails.userAddress = req.body.address;
      userDetails.save(function(err, user){
        if(err){
          sendJsonResponse(res, 400, err);
        }
        else{
          sendJsonResponse(res, 202, user);
        }
      });
    }
  });
};

/*Show User Order History*/
module.exports.showUserOrderHistory = function(req, res){
  if(!req.params.userid){
    sendJsonResponse(res, 404, {"message": "User Not Found"});
  }
  else{
    user.findById(req.params.userid).select('userOrders').exec(function(err, orders){
      if(!orders){
        sendJsonResponse(res, 404, {"message": "Orders not found"});
      }
      else if(err){
        sendJsonResponse(res, 400, err);
      }
      else{
        sendJsonResponse(res, 200, orders);
      }
    });
  }
};

/*Deleting User*/
module.exports.delete = function(req, res){
  if(req.params.userid){
    user.findByIdAndRemove(req.params.userid).exec(function(err, user){
      if(err){
        sendJsonResponse(res, 400, err);
      }
      else{
        sendJsonResponse(res, 204, null);
      }
    });
  }
  else{
    sendJsonResponse(res, 404, {"message": "Userid not found"});
  }
};

/*Placing Order for user*/
module.exports.placeOrder = function(req, res){
  if(req.params.userid && req.params.shopid){
    user.findById(req.params.userid).exec(function(err, userDetails){
      if(!userDetails){
        sendJsonResponse(res, 404, {'message': 'User Not Found'});
      }
      else if(err){
        sendJsonResponse(res, 400, err);
      }
      else{
        shop.findById(req.params.shopid).exec(function(err, shopDetails){
          if(!shopDetails){
            sendJsonResponse(res, 404, {'message': 'Shop Not Found'});
          }
          else if(err){
            sendJsonResponse(res, 400, err);
          }
          else{
            //save order in shop
            shopDetails.save(function(err, shopOrder){
              if(err){
                sendJsonResponse(res, 400, err);
              }
              else{
                userDetails.save(function(err, userOrder){
                  if(err){
                    sendJsonResponse(res, 400, err);
                  }
                  else{
                    sendJsonResponse(res, 201, userOrder);
                  }
                });
              }
            });
          }
        });
      }
    });
  }
  else{
    sendJsonResponse(res, 404, {"message": "Wrong URL"});
  }
};
