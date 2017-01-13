require('babel-core/register'); //enables ES6 ('import'.. etc) in Node
var multer = require("multer");
var upload = multer({ dest: __dirname+'/uploads/' })
if (process.env.NODE_ENV === 'production') {
  require('./server.prod')
} else {
  require('./server.dev');
}
