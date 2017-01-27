'use strict';

var mongoose = require('mongoose');

var channelSchema = mongoose.Schema({
  msg_count: { type:Number, default: 0},
  psychologue: {
    name: String,
    id: String
  },
  utilisateur: {
    name: String,
    id: String
  },
  active: {type: Boolean, default: true}
});

module.exports = mongoose.model('Channel', channelSchema);
