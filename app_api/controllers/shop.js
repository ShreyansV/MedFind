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

var theEarth = (function(){
  var earthRadius = 6371;
  var getDistanceFromRads = function(rads){
    return parseFloat(rads * earthRadius);
  };
  var getRadsFromDistance = function(distance){
    return parseFloat(distance / earthRadius);
  };

  return{
    getDistanceFromRads : getDistanceFromRads,
    getRadsFromDistance : getRadsFromDistance
  };
})();

module.exports.getShopDetails = function(req, res){

};

module.exports.addMedicines = function(req, res){

};

module.exports.editShopDetails = function(req, res){

};

module.exports.showShopOrderHistory = function(req, res){

};

module.exports.shopCreate = function (req, res) {
  shop.create({
    medicalShopName: req.body.name,
    address: req.body.address,
    facilities: req.body.facilities.split(","),
    coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
    openingTimes: [{
      days: req.body.days1,
      opening: req.body.opening1,
      closing: req.body.closing1,
      closed: req.body.closed1
    },
    {
      days: req.body.days2,
      opening: req.body.opening2,
      closing: req.body.closing2,
      closed: req.body.closed2
    }],
  }, function(err,location){
    if(err){
      sendJsonResponse(res, 404, err);
    }
    else {
      sendJsonResponse(res, 201, location);
    }
  });
};

module.exports.shopListByDistance = function (req, res) {
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);
  if(!lng || !lat){
    sendJsonResponse(res, 404, {"message": "lng and lat parameters required!!"});
    return;
  }
  var point = {
    type: "Point",
    coordinates: [lng, lat]
  };
  var geoOptions = {
    spherical: true,
  }
  shop.geoNear(point, geoOptions, function(err, result, stats){
    var locations = [];
    if(err){
      sendJsonResponse(res, 404, err);
    }
    else{
      result.forEach(function(doc){
        locations.push({
          distance: theEarth.getDistanceFromRads(doc.distance),
          medicalShopName: doc.obj.medicalShopName,
          address: doc.obj.address,
          ratings: doc.obj.ratings,
          facilities: doc.obj.facilities,
          _id: doc.obj._id
        });
      });
      sendJsonResponse(res, 200, locations);
    }
  });
};

module.exports.shopReadOne = function (req, res) {
    if(req.params && req.params.locationid){
      shop
        .findById(req.params.locationid)
        .exec(function(err,location){
          if(!location){
            sendJsonResponse(res, 404, {"message": "locationid not found"});
            return;
          }
          else if(err){
            console.log(err);
            sendJsonResponse(res, 404, err);
            return;
          }
          sendJsonResponse(res, 200, location);
        });
    }
    else{
      sendJsonResponse(res, 404, {"message": "No locationID specified"});
    }
};

module.exports.shopUpdateOne = function (req, res) {
  if(!req.params.locationid){
    sendJsonResponse(res, 404, {"message": "locationid not found"});
    return;
  }
  shop.findById(req.params.locationid).select('-reviews -rating').exec(function(err,location){
    if(!location){
      sendJsonResponse(res, 404, {"message": "location not found"});
      return;
    }
    else if(err){
      sendJsonResponse(res, 400, err);
      return;
    }
    location.name = req.body.name;
    location.address = req.body.address;
    location.facilities = req.body.facilities.split(",");
    location.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
    location.openingTimes = [{
      days: req.body.days1,
      opening: req.body.opening1,
      closing: req.body.closing1,
      closed: req.body.closed1
    },{
      days: req.body.days2,
      opening: req.body.opening2,
      closing: req.body.closing2,
      closed: req.body.closed2
    }];
    location.save(function(err,location){
      if(err){
        sendJsonResponse(res, 400, err);
      }
      else{
        sendJsonResponse(res, 200, location);
      }
    });
  });
};

module.exports.shopDeleteOne = function (req, res) {
  if(!req.params.locationid){
    shop.findByIdAndRemove(req.params.locationid).exec(function(err,location){
      if(err){
        sendJsonResponse(res, 404, err);
      }
      else{
        sendJsonResponse(res, 204, null);
      }
    });
  }
  else{
    sendJsonResponse(res, 404, {"message": "locationid not found"});
  }
};
