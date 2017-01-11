'use strict';

var mongoose = require('mongoose');

var channelSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  psychologue: {
    name: String,
    id: Number
  },
  utilisateur: {
    name: String,
    id: Number
  }
});

module.exports = mongoose.model('Channel', channelSchema);
