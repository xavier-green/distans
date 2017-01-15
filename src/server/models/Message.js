'use strict';

var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  channelId: mongoose.Schema.Types.ObjectId,
  text: String,
  time: String
});

module.exports = mongoose.model('Message', messageSchema);
