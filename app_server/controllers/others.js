module.exports.about = function(req, res, next){
res.render('about', {
    title: 'MedFind',
    about: 'Medical Store Finder was made to find stores nearby you when in emergency. In case of emergency you can buy medicines on websites which will be delivered to you within minutes.',
    developer: 'Shreyans Vora'
  });
};
