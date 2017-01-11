var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  id: Number,
  local: {
    username: { type: String, unique: true },
    password: String,
    email: String,
  },
  type: Number, //0=utilisateur, 1=psychologue
  contacts: [{
    id: Number,
    name: String
  }]
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
