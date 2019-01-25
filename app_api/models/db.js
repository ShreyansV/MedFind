var mongoose = require('mongoose');
var gracefulShutdown;
var dbURI = 'mongodb://localhost/MedFind';
mongoose.connect(dbURI);

mongoose.connection.on('connect',function(){
  console.log('Mongoose connected to: '+ dbURI);
});

mongoose.connection.on('disconnect',function(){
  console.log('Mongoose disconnected to: '+ dbURI);
});

mongoose.connection.on('error',function(){
  console.log('Mongoose connection error to: '+ dbURI);
});

gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

//For nodemon restarts
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});

//For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function () {
    process.exit(0);
  });
});

// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app shutdown', function () {
    process.exit(0);
  });
});

require('./allSchemas');
