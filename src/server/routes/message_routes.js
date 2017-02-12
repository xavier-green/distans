var Message = require('../models/Message');
var Channel = require('../models/Channel');
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

    Channel.findOne({_id:copy.channelId})
    .then((channel)=>{
      console.log("Updating channel count");
      if (!copy.fromPsy) {
        channel.msg_count += 1;
      }
      channel.save()
      .then(()=>{
        console.log("All saved, count: "+channel.msg_count);
        console.log(copy.fromPsy);
        var msgAccepted = false;
        if (channel.msg_count<7 || copy.fromPsy) {
          msgAccepted = true;
          newMessage.save()
          .then((msg) => {
            console.log("Got newmessage:");
            console.log(msg);
            res.status(200).json({msgAccepted:msgAccepted});
          })
        } else {
          res.status(200).json({msgAccepted:msgAccepted});
        }
      })
    })
    .catch((err) => {
      res.status(500).json(err)
    })
  });
}
