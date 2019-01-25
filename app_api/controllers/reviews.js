var mongoose = require('mongoose');
var loc = mongoose.model('Shop');

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
}

var updateAverageRating = function(_id, new_ratings, type){
  loc.findById(_id).select('ratings reviews').exec(
    function(err, location){
      if(!err){
        var reviewCount = location.reviews.length;
        var ratingTotal = 0;
        for(i=0;i<reviewCount;i++)
          ratingTotal = ratingTotal + location.reviews[i].reviewRating;
        location.ratings = ratingTotal/reviewCount;

        location.save(function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log("Average Ratings Updated");
          }
        });
      }
    }
  );
};

module.exports.reviewsDeleteOne = function (req, res) {
  if(req.params.locationid && req.params.reviewid){
    if(req.params.locationid){
      loc.findById(req.params.locationid).select('reviews').exec(function(err,location){
        if(!location){
          sendJsonResponse(res, 404, {"message": "location not found"});
        }
        else if(err){
          sendJsonResponse(res, 400, err);
        }
        else{
          if(location.reviews && location.reviews.length > 0){
            if(!location.reviews.id(req.params.reviewid)){
              sendJsonResponse(res, 404, {"message": "reviewid not found"});
            }
            else{
              location.reviews.id(req.params.reviewid).remove();
              location.save(function(err,location){
                if(err){
                  console.log(err);
                  sendJsonResponse(res, 400, err);
                }
                else{
                  updateAverageRating(location._id);
                  sendJsonResponse(res, 204, null);
                }
              });
            }
          }
          else{
            sendJsonResponse(res, 404, {"message": "No reviews found"});
          }
        }
      });
    }
    else{
      sendJsonResponse(res, 404, {"message": "locationid not found"});
    }
  }
  else{
    sendJsonResponse(res, 404, {"message": "locationid or reviewid not found"});
  }
};

module.exports.reviewsReadOne = function (req, res) {
  if(req.params && req.params.locationid && req.params.reviewid){
    loc
      .findById(req.params.locationid)
      .select('name reviews')
      .exec(
        function(err, location){
          var response,review;
          if(!location){
            sendJsonResponse(res,404, {"message": "locationid Nit found"});
            return;
          }
          else if(err){
            sendJsonResponse(res,404,err);
            return;
          }
          if(location.reviews && location.reviews.length>0){
            review = location.reviews.id(req.params.reviewid);
            if(!review){
              sendJsonResponse(res,404,{"message": "reviewid not found"});
              return;
            }
            else{
              response = {
                location: {
                  name: location.name,
                  id: req.params.locationid
                },
                review: review
              };
              sendJsonResponse(res, 200, response);
            }
          }
          else{
            sendJsonResponse(res, 404, {"message": "No reviews found"});
          }
        }
      );
  }
  else{
    sendJsonResponse(res, 404, {"message": "Not found, locationid and reviewid both are required"});
  }
};

module.exports.reviewsUpdateOne = function (req, res) {
  if(!req.params.locationid || !req.params.reviewid){
    sendJsonResponse(res, 404, {"message": "locationid not found"});
    return;
  }
  loc.findById(req.params.locationid).select('reviews').exec(function(err, location){
    var thisReview;
    if(!location){
      sendJsonResponse(res, 404, {"message": "locationid not found"});
      return;
    }
    else if(err){
      sendJsonResponse(res, 400, err);
      return;
    }
    if(location.reviews && location.reviews.length > 0){
      thisReview = location.reviews.id(req.params.reviewid);
      if(!thisReview){
        sendJsonResponse(res, 404, {"message": "reviewid not found"});
        return;
      }
      else{
        thisReview.author = req.body.author;
        thisReview.rating = req.body.rating;
        thisReview.reviewText = req.body.reviewText;
        location.save(function(err, location){
          if(err){
            console.log(err);
            sendJsonResponse(res, 400, err);
          }
          else{
            updateAverageRating(location._id);
            sendJsonResponse(res, 200, location);
          }
        });
      }
    }
    else{
      sendJsonResponse(res, 404, {"message": "No review to update"});
    }
  });
};

module.exports.reviewsCreate = function (req, res) {
  console.log(req.body);
  var locationid = req.params.locationid;
  if(locationid){
    loc.findById(locationid).select("reviews").exec(
      function(err, location){
        if(err){
          sendJsonResponse(res, 404, err);
        }
        else{
          location.reviews.push({
            reviewerName: req.body.reviewerName,
            reviewRating: req.body.ratings,
            reviewComment: req.body.reviewText
          });
          location.save(function(err, location){
            var thisReview;
            if(err){
              console.log(err);
              sendJsonResponse(res, 400, err);
            }
            else{
              updateAverageRating(location._id);
              thisReview = location.reviews[location.reviews.length - 1];
              sendJsonResponse(res, 201, thisReview);
            }
          });
        }
      }
    );
  }
  else{
    sendJsonResponse(res, 404, {"message": "Not found, locationid required"});
  }
};
