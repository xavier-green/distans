require('babel-core/register'); //enables ES6 ('import'.. etc) in Node
var dotenv = require('dotenv');
if (process.env.NODE_ENV) {
  dotenv.load({ path: __dirname+'/../../.env.'+process.env.NODE_ENV });
} else {
  dotenv.load({ path: __dirname+'/../../.env.development' });
}
if (process.env.NODE_ENV === 'production') {
  require('./server.prod')
} else {
  require('./server.dev');
}
