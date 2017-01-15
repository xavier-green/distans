'user strict';

var bodyparser = require('body-parser');
var User = require('../models/User.js');
var multer = require("multer");
var upload = multer({ dest: __dirname+'/uploads/' });
var path = require("path");
var fs = require("fs");
var bluebird = require("bluebird");
var renameAsync = bluebird.promisify(fs.rename);

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

  router.post('/sign_up_user', passport.authenticate('local-signup-user', { session: false}), function(req, res) {
    res.json(req.user);
  });

  router.post('/sign_up_psy', passport.authenticate('local-signup-psy', { session: false}), function(req, res) {
    res.json(req.user);
  });

  router.post('/sign_in', passport.authenticate('local-login', { session: false}), function(req, res) {
    res.json(req.user);
  });

  router.post('/sign_in_psy', passport.authenticate('local-login-psy', { session: false}), function(req, res) {
    res.json(req.user);
  });

  router.post('/fileupload', upload.array('file',2), (req,res,next) => {
    var uploadDir = path.join(__dirname, '/uploads/');
    var files = req.files;
    var names = req.body.filenames;
    var email = req.body.email;
    bluebird.map(files, (file, i) => {
      var name = names[i]+" - "+email+path.extname(file.originalname);
      return renameAsync(file.path, path.join(uploadDir,name));
    })
    .then(() => {
      res.json({success: true})
    })
    .catch((err) => {
      console.log(err);
      res.json({success: false});
    })
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
