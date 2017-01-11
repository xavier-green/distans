'use strict';

var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  id: String,
  channelId: Number,
  text: String,
  time: String
});

module.exports = mongoose.model('Message', messageSchema);
