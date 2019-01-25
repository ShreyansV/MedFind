var request = require('request');
var apiOptions = {server: "http://localhost:3000"};

var _showError = function(req, res, statusCode){
	var title, content;
	if(statusCode == 404){
		title = "404, Page not found!!";
		content = "Looks like we can't find the Page. Sorry!!";
	}
	else{
		title = statusCode + ", something's gone wrong!!";
		content = "Something has just gone wrong. Go to homepage ->";
	}
	res.status(statusCode);
	res.render('generic-text', {
		title: title,
		content: content
	});
};

/*FindMedicine Page*/

/*Doubtful*/
module.exports.findMedicine = function(req, res){
  //Fetch the names of medicines
	res.render('findMedicineShop',{
		title: 'MedFind'
	});
};

/*medicine form page*/
module.exports.medicineForm = function(req, res){
	//Fetch the details of shop
  res.render('addMedicine',{
		title: 'MedFind',
	});
};

/*Add Medicines to the shop*/
module.exports.addMedicine = function(req, res){

};
