var express = require('express');
var passport = require('passport');
var flash = require('connect-flash');
var router = express.Router();

/* GET home page. */
router.get('/', isLoggedIn, function(req, res){
  res.render('index');
});

router.get('/login', function(req, res){
  res.render('login', { message: req.flash('error')});
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));


router.post('/logout', function(req, res){
  req.logout();
  req.redirect('/');
});

//this will be an internal page first, use to create the admin user 
//and then all the user should only be created by the admin user, 
//this page will only be accessed by admin  
router.get('/signup', isAdmin, function(req, res){
  res.render('signup', { message: req.flash('error')});
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to the / section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow messages
}));

router.get('/admin', isAdmin, function(req, res){
  res.render('admin');
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

function isAdmin(req, res, next){
  if(req.isAuthenticated() && req.user && req.user.local && req.user.local.username === 'admin'){
    return next();
  }
  res.redirect('/');
}
module.exports = router;