var express = require('express');
var passport = require('passport');
var flash = require('connect-flash');
var Account = require('../models/account');
var router = express.Router();

/* GET home page. */
router.get('/', isLoggedIn, function(req, res){
  res.render('index');
});

router.get('/login', function(req, res){
  res.render('login', { message: '' }); // we should come to flash later
  //res.render('login', { message: req.flash('loginMessage')});
});

//this will be an internal page first, use to create the admin user 
//and then all the user should only be created by the admin user, 
//this page will only be accessed by admin  
router.get('/signup', function(req, res){
  res.render('signup', { message: '' });
  //res.render('signup', { message: req.flash('signupMessage')})
});

router.get('/admin', isLoggedIn, function(req, res){
  res.render('admin');
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
  console.log('finished the redirect');
}
module.exports = router;