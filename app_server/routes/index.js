var express = require('express');
var router = express.Router();

var ctrlMain = require('../controllers/main');
var ctrlOthers = require('../controllers/others');
var ctrlOrder = require('../controllers/order');
var ctrlUser = require('../controllers/user');
var ctrlShop = require('../controllers/shop');
var ctrlBoy = require('../controllers/DeliveryBoy');

router.get('/', ctrlMain.entry);//
router.get('/signInShop', ctrlShop.signIn);//
router.get('/loginShop', ctrlShop.login);//
router.get('/user/:shopid/editDetails', ctrlShop.editDetails);//
router.get('/shop/:shopid/showDetails', ctrlShop.showDetails);//
router.get('/shop/:shopid/orderHistory', ctrlShop.orderHistory);//
router.get('/shop/:shopid/addMedicines', ctrlShop.medicineForm);//
router.get('/shop/:shopid/showMedicines', ctrlShop.showMedicinesAtShop);//
router.get('/user/:userid/:shopid/order',ctrlOrder.order);//
router.get('/user', ctrlUser.shopList);//
router.get('/shop/:shopid/reviews/new', ctrlUser.addReview);//
router.get('/user/:shopid', ctrlUser.shopInfo);//
router.get('/user/:userid/orderHistory', ctrlUser.orderHistory);//
router.get('/loginUser', ctrlUser.login);//
router.get('/user/:userid/editDetails', ctrlUser.editDetails);//
router.get('/user/:userid/showDetails', ctrlUser.showDetails);//
router.get('/signInUser', ctrlUser.signInUser);//
router.get('/logindboy', ctrlBoy.login);//
router.get('/signInDboy', ctrlBoy.signIn);//
router.get('/dboy/:dboyid/editDetails', ctrlBoy.editDetails);//
router.get('/dboy/:dboyid/workDetails', ctrlBoy.workDetails);//
router.get('/dboy/:dboyid/payslipPage', ctrlBoy.showPayslip);
router.get('/about',ctrlOthers.about);//

router.post('/loginShop', ctrlShop.checkLogin);//
router.post('/signInShop', ctrlShop.create);
router.post('/shop/:shopid/addMedicines', ctrlShop.addMedicine);
router.post('/signInDboy', ctrlBoy.create);
router.post('/logindboy', ctrlBoy.checkLogin);//
router.post('/loginUser', ctrlUser.checkLogin);//
router.post('/shop/:shopid/reviews/new', ctrlUser.doAddReview);//
router.post('/signInUser', ctrlUser.create);
router.post('/user/:shopid/order',ctrlOrder.placeOrder);

router.put('/user/:userid/editDetails', ctrlUser.confirmDetails);
router.put('/dboy/:dboyid/editDetails', ctrlBoy.confirmDetails);
router.put('/shop/:shopid/editDetails', ctrlShop.confirmDetails);

router.delete('/user/:userid/delete', ctrlUser.delete);
router.delete('/shop/:shopid/delete', ctrlShop.delete);
router.delete('/dboy/:dboyid/delete', ctrlBoy.delete);
router.delete('/shop/:shopid/:medicineid/delete', ctrlShop.deleteMedicine);

module.exports = router;
