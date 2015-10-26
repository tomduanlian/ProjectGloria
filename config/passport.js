var LocalStrategy = require('passport-local').Strategy;
var Account = require('../models/account');

module.exports = function(passport) {
  passport.serializeUser(function(acc, done) {
    done(null, acc._id);
  });

  passport.deserializeUser(function(id, done) {
      Account.findById(id, function(err, acc) {
          done(err, acc);
      });
  });

  passport.use('local-signup', new LocalStrategy({
    passReqToCallBack : true // allows us to pass back the entire request to the callback
  },
  function(username, password, done) {
    process.nextTick(function() {
      Account.findOne({ 'local.username' :  username }, function(err, acc) {
        // if there are any errors, return the error
        if (err) {
            return done(err);
        }
        // check to see if theres already a account with that username  
        if (acc) {
            return done(null, false, {'message': 'That username already existed.'});
        } else {
          // create the account
          var newAccount = new Account();
          // set the account's local credentials
          newAccount.local.username = username;
          newAccount.local.password = newAccount.generateHash(password);
          // save the account
          newAccount.save(function(err) {
              if (err) {
                throw err;
              }
              return done(null, newAccount);
          });
        }
      });    
    });
  }));

  passport.use('local-login', new LocalStrategy({
    passReqToCallBack: true
  },
  function(username, password, done){
    Account.findOne({'local.username': username}, function(err, acc){
      if(err){
        return done(err);
      }
      if(!acc || !acc.validPassword(password)) {
        return done(null, false, {'message': 'Username or password incorrect!'});
      }
      return done(null, acc);
    })
  }));
}