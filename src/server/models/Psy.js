var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var PsySchema = mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name : { type: String, required: true },
  sex : { type: String, required: true },
  bday : { type: String, required: true },
  region : { type: String, required: true },
  patients: { type: Number, default:0 },
  active: { type:Boolean, default: false},
  videoconf: { type:Boolean, default: true}
});

PsySchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
PsySchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Psy', PsySchema);
