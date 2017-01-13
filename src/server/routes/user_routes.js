'user strict';

var bodyparser = require('body-parser');
var User = require('../models/User.js');
var multer = require("multer");
var upload = multer({ dest: __dirname+'/uploads/' });
var path = require("path");
var fs = require("fs");

module.exports = function loadUserRoutes(router, passport) {
  router.use(bodyparser.json());

  router.get('/auth/facebook', passport.authenticate('facebook', {
    session: false,
    successRedirect: '/chat',
    failureRedirect: '/'
  }));

  router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    session: false,
    successRedirect: '/chat',
    failureRedirect: '/'
  }));

  router.post('/sign_up', passport.authenticate('local-signup', { session: false}), function(req, res) {
    // req.session.user = req.user;
    res.json(req.user);
  });

  router.post('/sign_in', passport.authenticate('local-login', { session: false}), function(req, res) {
    // req.session.user = req.user;
    res.json(req.user);
  });

  router.post('/fileupload', upload.any(), (req,res,next) => {
    var uploadDir = path.join(__dirname, '/uploads');
    var file = req.files[0];
    var name = req.body.name+" - "+req.body.email+path.extname(file.originalname);
    console.log("Saving file as: "+name);
    fs.rename(file.path, path.join(uploadDir, name), (err) => {
      if (err) {
        res.json({success: false})
      } else {
        res.json({success: true})
      }
    });
  })

  router.get('/signout', function(req, res) {
    req.logout();
    res.end();
  });

  //get auth credentials from server
  router.get('/load_auth_into_state', function(req, res) {
    res.json(req.user);
  });

  // get usernames for validating whether a username is available
  router.get('/all_usernames', function(req, res) {
    User.find({'local.username': { $exists: true } }, {'local.username': 1, _id:0}, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  })
};
