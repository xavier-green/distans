var Channel = require('../models/Channel');
var bodyparser = require('body-parser');
var User = require('../models/User.js');

module.exports = function(router) {
  router.use(bodyparser.json());

  // deprecating this route since it just gets all channels
  router.get('/channels', function(req, res) {

    Channel.find({},{name: 1, id:1, _id:0}, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json(data);
    });
  });

  // this route returns all channels including private channels for that user
  router.get('/channels/:username', function(req, res) {
    console.log(req.params.username);
    User.findOne({"local.username":req.params.username}, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      console.log(data);
      res.json(data.contacts);
    })
  })

  // post a new user to channel list db
  router.post('/channels/new_channel', function(req, res) {
    var newChannel = new Channel(req.body);
    newChannel.save(function (err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json(data);
    });
  });
}
