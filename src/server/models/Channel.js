'use strict';

var mongoose = require('mongoose');

var channelSchema = mongoose.Schema({
  psychologue: {
    name: String,
    id: mongoose.Schema.Types.ObjectId
  },
  utilisateur: {
    name: String,
    id: mongoose.Schema.Types.ObjectId
  }
});

module.exports = mongoose.model('Channel', channelSchema);
