var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var Account = new Schema(
  {
    local: { 
      username: String,
      password: String
    }
  }
);

Account.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

Account.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('Account', Account);