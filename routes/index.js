var express = require('express');
var passport = require('passport');
var flash = require('connect-flash');
var Account = require('../models/account');
var router = express.Router();

/* GET home page. */
router.get('/', isLoggedIn, function(req, res){
  if (req.user.local.username === 'admin') {
    return res.redirect('/admin');   
  };
  res.render('index', { user: req.user, pageType : 'index' });
});

router.get('/login', function(req, res){
  res.render('login', { message: req.flash('error'), pageType : 'login' });
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/logout', function(req, res){
  req.session.destroy(function(){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    res.redirect('/');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
  });
});

//this will be an internal page first, use to create the admin user 
//and then all the user should only be created by the admin user, 
//this page will only be accessed by admin  
router.get('/signup', function(req, res){
  res.render('signup', { message: req.flash('error'), pageType : 'signup'});
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to the / section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow messages
}));

router.get('/admin', isAdmin, function(req, res){
  Account
    .find()
    .where('local.username')
    .ne('admin')
    .exec(function(err, accounts){
      var accNameList = [];
      var i;
      var acc;
      for(i = 0; i < accounts.length; i ++) {
        acc = accounts[i];
        accNameList.push(acc.local.username);
      }
      res.render('admin', { pageType : 'admin', accList : accNameList });
    });
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