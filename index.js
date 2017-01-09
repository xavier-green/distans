var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'src/client/public')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/client/public/index.html'));
});

app.post('/post',(req,res,next) => {
  res.send({response:"yes"})
})

var server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

var io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat',(data) => {
    console.log("Message received: "+data.text);
    io.emit('chat',data);
  });
});
