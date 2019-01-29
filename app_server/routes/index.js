var express = require('express');
var router = express.Router();

var ctrlMain = require('../controllers/main');
var ctrlOthers = require('../controllers/others');
var ctrlUser = require('../controllers/user');
var ctrlShop = require('../controllers/shop');
var ctrlBoy = require('../controllers/DeliveryBoy');

/*Main Entry point to website*/
router.get('/', ctrlMain.entry);

/*Shop Controllers*/
router.get('/signInShop', ctrlShop.signIn);
router.post('/signInShop', ctrlShop.create);
router.get('/loginShop', ctrlShop.login);
router.post('/loginShop', ctrlShop.checkLogin);
router.get('/shop/:shopid/showDetails', ctrlShop.showDetails);
router.get('/shop/:shopid/editDetails', ctrlShop.editDetails);
router.put('/shop/:shopid/editDetails', ctrlShop.confirmDetails);
router.get('/shop/:shopid/orderHistory', ctrlShop.orderHistory);
router.get('/shop/:shopid/addMedicines', ctrlShop.medicineForm);
router.post('/shop/:shopid/addMedicines', ctrlShop.addMedicine);
router.delete('/shop/:shopid/:medicineid/delete', ctrlShop.deleteMedicine);
router.get('/shop/:shopid/showMedicines', ctrlShop.showMedicinesAtShop);
router.delete('/shop/:shopid/delete', ctrlShop.delete);
router.get('/shop/:shopid/logout', ctrlShop.logout);

/*User Controllers*/
router.get('/signInUser', ctrlUser.signInUser);
router.post('/signInUser', ctrlUser.create);
router.get('/loginUser', ctrlUser.login);
router.post('/loginUser', ctrlUser.checkLogin);
router.get('/user', ctrlUser.shopList);
router.get('/user/:shopid', ctrlUser.shopInfo);
router.get('/user/:userid/:shopid/order',ctrlUser.order);
router.post('/user/:userid/:shopid/order',ctrlUser.placeOrder);
router.get('/shop/:shopid/reviews/new', ctrlUser.addReview);
router.post('/shop/:shopid/reviews/new', ctrlUser.doAddReview);
router.get('/user/:userid/orderHistory', ctrlUser.orderHistory);
router.get('/user/:userid/showDetails', ctrlUser.showDetails);
router.get('/user/:userid/editDetails', ctrlUser.editDetails);
router.put('/user/:userid/editDetails', ctrlUser.confirmDetails);
router.delete('/user/:userid/delete', ctrlUser.delete);
router.get('/user/:userid/logout', ctrlUser.logout);

/*DeliveryBoy Controllers*/
router.get('/signInDboy', ctrlBoy.signIn);
router.post('/signInDboy', ctrlBoy.create);
router.get('/logindboy', ctrlBoy.login);
router.post('/logindboy', ctrlBoy.checkLogin);
router.get('/dboy/:dboyid/workDetails', ctrlBoy.workDetails);
router.get('/dboy/:dboyid/showDetails', ctrlBoy.showDetails);
router.get('/dboy/:dboyid/editDetails', ctrlBoy.editDetails);
router.put('/dboy/:dboyid/editDetails', ctrlBoy.confirmDetails);
router.get('/dboy/:dboyid/payslipPage', ctrlBoy.showPayslip);
router.delete('/dboy/:dboyid/delete', ctrlBoy.delete);
router.get('/dboy/:dboyid/logout', ctrlBoy.logout);

/*About Page Controllers*/
router.get('/about',ctrlOthers.about);

module.exports = router;
