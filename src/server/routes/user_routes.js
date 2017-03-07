'user strict';

var bodyparser = require('body-parser');
var User = require('../models/User.js');
var Psy = require('../models/Psy.js');
var multer = require("multer");
var upload = multer({ dest: __dirname+'/uploads/' });
var path = require("path");
var fs = require("fs");
var bluebird = require("bluebird");
var renameAsync = bluebird.promisify(fs.rename);
var sendEmail = require('./../controllers/email').sendEmail;

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
    console.log("done signing up user, username: "+req.user.username);
    sendEmail("","User signup","New signup from: "+req.user.username)
    res.json(req.user);
  });

  router.post('/sign_up_psy', passport.authenticate('local-signup-psy', { session: false}), function(req, res) {
    console.log("done signing up psy, email: "+req.user.email);
    sendEmail("","Psy signup","New signup from: "+req.user.email)
    res.json(req.user);
  });

  router.post('/sign_in', passport.authenticate('local-login', { session: false}), function(req, res) {
    console.log("done signing in user, username: "+req.user.username);
    sendEmail("","User signin","New signin from: "+req.user.username)
    res.json(req.user);
  });

  router.post('/sign_in_psy', passport.authenticate('local-login-psy', { session: false}), function(req, res) {
    console.log("done signing in psy, email: "+req.user.email);
    sendEmail("","Psy signin","New signin from: "+req.user.email)
    res.json(req.user);
  });

  router.post('/edituser', (req,res,next) => {
    let { username,email,dob,sex } = req.body;
    console.log("Editting user "+username);
    if (email !== null || dob !== null || sex !== null) {
      User.findOne({username:username}, (err,doc)=>{
        if (email !== null) {
          doc.email = email;
        }
        if (dob !== null) {
          doc.dob = dob;
        }
        if (sex !== null) {
          doc.sex = sex;
        }
        doc.save()
        .then((nDoc)=>{
          res.status(200).json(nDoc);
        })
      })
    }
  });

  router.post('/editpsy', (req,res,next) => {
    let { email,dob,sex } = req.body;
    console.log("Editting psy "+email);
    if (email !== null || dob !== null || sex !== null) {
      Psy.findOne({email:email}, (err,doc)=>{
        if (dob !== null) {
          doc.bday = dob;
        }
        if (sex !== null) {
          doc.sex = sex;
        }
        doc.save()
        .then((nDoc)=>{
          res.status(200).json(nDoc);
        })
      })
    }
  });

  router.post('/fileupload', upload.array('file',2), (req,res,next) => {
    console.log("uploading psy files");
    var uploadDir = path.join(__dirname, '/uploads/');
    var files = req.files;
    var names = req.body.filenames;
    var email = req.body.email;
    console.log("with email "+email);
    bluebird.map(files, (file, i) => {
      var name = names[i]+" - "+email+path.extname(file.originalname);
      return renameAsync(file.path, path.join(uploadDir,name));
    })
    .then(() => {
      console.log("uploaded okay !");
      res.json({success: true})
    })
    .catch((err) => {
      console.log(err);
      res.json({success: false});
    })
  });

  router.post('/sendcontact', (req,res,next)=>{
    let { subject,email,message } = req.body;
    console.log('Sending email from: '+email);
    sendEmail(email,subject,message)
    .then((mail)=>{
      console.log("Email sent");
      console.log(mail);
      res.status(200).json({ok:true});
    })
    .catch((err)=>{
      console.log(err);
      res.status(500).json(err);
    })
  })

  router.get('/signout', function(req, res) {
    console.log("signing out");
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
