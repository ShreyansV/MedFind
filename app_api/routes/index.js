var express = require('express');
var router = express.Router();
var ctrlShop = require('../controllers/shop');
var ctrlReviews = require('../controllers/reviews');
var ctrlBoy = require('../controllers/DeliveryBoy');
var ctrlUser = require('../controllers/user');

// Shop
router.get('/shops', ctrlShop.shopListByDistance);
router.post('/shopsCreate', ctrlShop.shopCreate);
router.get('/shops/:shopid', ctrlShop.shopReadOne);
router.put('/shops/:shopid', ctrlShop.shopUpdateOne);
router.delete('/shops/:shopid', ctrlShop.shopDeleteOne);
router.post('/shop/:shopid/addMedicine', ctrlShop.addMedicines);
router.post('/shop/:shopid/confirmDetails', ctrlShop.confirmDetails);
router.get('/checkShopLogin', ctrlShop.checkLogin);
router.get('/shop/:shopid/:medicineid/deleteMedicine', ctrlShop.deleteMedicine);

// reviews
router.post('/shops/:shopid/reviews', ctrlReviews.reviewsCreate);
router.get('/shops/:shopid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/shops/:shopid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('/shops/:shopid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);

//Delivery Boy
router.post('/boyCreate', ctrlBoy.createAccount);
router.get('/checkboyLogin', ctrlBoy.checkLogin);
router.post('/boy/:boyid/confirmDetails', ctrlBoy.editDeliveryBoyDetails);

//User Details
router.post('/userCreate', ctrlUser.create);
router.put('/userEditDetails', ctrlUser.editUserDetails);
router.get('/user/:userid/getOrderHistory', ctrlUser.showUserOrderHistory);
router.delete('/user/:userid/delete', ctrlUser.delete);
router.get('/checkUserLogin', ctrlUser.checkLogin);
router.post('/user/:userid/:shopid/placeOrder', ctrlUser.placeOrder);

module.exports = router;
