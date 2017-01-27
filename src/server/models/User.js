var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  username : { type: String, index: { unique: true}, required: true },
  password : { type: String, required: true },
  email : String,
  sex : String,
  psy_wanted :  mongoose.Schema.Types.Mixed
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
