var Channel = require('../models/Channel');
var bodyparser = require('body-parser');
var User = require('../models/User.js');
var Psy = require('../models/Psy.js');
var Channel = require('../models/Channel.js');
var bluebird = require("bluebird");
var sendEmail = require('./../controllers/email').sendEmailTo;

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
  router.get('/channels/psy/:psyid', function(req, res) {
    console.log("Psy channel request");
    Channel.find({ 'psychologue.id': req.params.psyid }, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      console.log(data);
      res.json(data);
    })
  })

  router.get('/channels/user/:userid', function(req, res) {
    console.log("User channel request");
    Channel.find({ 'utilisateur.id': req.params.userid }, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      console.log(data);
      res.json(data);
    })
  })

  function getRegion(region) {
    region.active = true;
    console.log("'Region' request:");
    console.log(region);
    return Psy.find(region).sort({patients:1}).exec()
    .then((docs) => {
      console.log("psies in region:");
      console.log(docs);
      return docs
    })
    .catch((err) => {
      console.log(err);
      return bluebird.reject(err)
    })
  }

  function saveNewChannel(data) {
    console.log("saving channel!");
    var newChannel = new Channel(data);
    return newChannel.save()
    .then((docs) => {
      return docs
    })
    .catch((err) => {
      console.log(err);
      return bluebird.reject(err);
    })
  }

  // post a new user to channel list db
  router.post('/channels/new_channel', function(req, res) {
    //1) Find psy --> Location / Sex / number
    //2) Create channel
    //3) Increment patients for psy
    var data = req.body;
    console.log("searching psy for "+data.username);
    var utilisateur = {
      name: data.username,
      id: data._id
    };
    var region = {};
    if (data.psy_wanted.region && (data.psy_wanted.region !== null)) {
      region = {region: data.psy_wanted.region}
    }
    console.log("region: "+region);
    return getRegion(region)
    .then((docs) => {
      if (docs.length>0) {
        console.log("More than 1 psy");
        var sexOk = docs.filter((el) => {
          return el.sex == data.psy_wanted.sex;
        });
        var psy = null;
        if (sexOk.length>0) {
          psy = sexOk[0];
        } else {
          psy = docs[0];
        }
        console.log("Psy selected:");
        console.log(psy);
        var psychologue = {
          name: psy.name,
          id: psy._id
        };
        return saveNewChannel({
          psychologue,
          utilisateur
        })
        .then((resp) => {
          console.log("Nearly there!");
          console.log("updating psy patients");
          psy.patients += 1;
          psy.save()
          .then((doc) => {
            sendEmail(psy.email, "Vous avez un nouveau patient !", "Bonjour<br/><br/>Allez vite voir sur la plateforme, vous avez un nouveau patient !")
            res.json(doc)
          })
          .catch((er) => {
            console.log(er);
            return res.status(500).json({msg: er});
          })
        })
        .catch((err) => {
          console.log(err);
        })
      } else {

        return getRegion({})
        .then((docs) => {
          console.log("More than 1 psy");
            var sexOk = docs.filter((el) => {
              return el.sex == data.psy_wanted.sex;
            });
            var psy = null;
            if (sexOk.length>0) {
              psy = sexOk[0];
            } else {
              psy = docs[0];
            }
            console.log("Psy selected:");
            console.log(psy);
            var psychologue = {
              name: psy.name,
              id: psy._id
            };
            return saveNewChannel({
              psychologue,
              utilisateur
            })
            .then((resp) => {
              console.log("Nearly there!");
              console.log("updating psy patients");
              psy.patients += 1;
              psy.save()
              .then((doc) => {
                sendEmail(psy.email, "Vous avez un nouveau patient !", "Bonjour<br/><br/>Allez vite voir sur la plateforme, vous avez un nouveau patient !")
                res.json(doc)
              })
              .catch((er) => {
                console.log(er);
                return res.status(500).json({msg: er});
              })
            })
            .catch((err) => {
              console.log(err);
              return res.status(500).json({msg: err});
            })
        })

      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({msg: err});
    })
  });
}
