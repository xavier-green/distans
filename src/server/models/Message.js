'use strict';

var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  channelId: { type: mongoose.Schema.Types.ObjectId },
  text: { type:String, required:true},
  time: { type:String, required:true},
  fromPsy: { type:Boolean, required:true}
});

messageSchema.set('autoIndex',false);
messageSchema.index({channelId:1});

module.exports = mongoose.model('Message', messageSchema);
