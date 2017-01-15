var Message = require('../models/Message');
var bodyparser = require('body-parser');

module.exports = function(router) {
  router.use(bodyparser.json());

  // query DB for ALL messages
  router.get('/messages', function(req, res) {
    Message.find({}, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  });

  // query DB for messages for a specific channel
  router.get('/messages/:channelId', function(req, res) {
    console.log("Looking for messages with id: "+req.params.channelId);
    var ObjectId = require('mongoose').Types.ObjectId;
    var query = { channelId: new ObjectId(req.params.channelId) };
    Message.find(query, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  })

  //post a new message to db
  router.post('/newmessage', function(req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;
    var copy = req.body;
    var channelId = copy.channelId;
    copy.channelId = new ObjectId(channelId);
    var newMessage = new Message(copy);
    newMessage.save(function (err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  });
}
