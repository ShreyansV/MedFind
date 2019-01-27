var express = require('express');
var router = express.Router();
var ctrlShop = require('../controllers/shop');
var ctrlReviews = require('../controllers/reviews');
var ctrlBoy = require('../controllers/DeliveryBoy');
var ctrlUser = require('../controllers/users');

// Shop
router.get('/shops', ctrlShop.shopListByDistance);
router.post('/shopsCreate', ctrlShop.shopCreate);
router.get('/shops/:shopEmailId', ctrlShop.getDetails);
router.get('/shops/:shopid', ctrlShop.shopReadOne);
router.put('/shops/:shopid', ctrlShop.shopUpdateOne);
router.delete('/shops/:shopid', ctrlShop.shopDeleteOne);

// reviews
router.post('/shops/:shopid/reviews', ctrlReviews.reviewsCreate);
router.get('/shops/:shopid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/shops/:shopid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('/shops/:shopid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);

//Delivery Boy
router.post('/boyCreate', ctrlBoy.createAccount);
router.get('/dboyDetails/:boyEmailId', ctrlBoy.getDetails);

//User Details
router.get('/user/:userEmailId', ctrlUser.getDetails);
router.post('/userCreate', ctrlUser.create);

module.exports = router;
