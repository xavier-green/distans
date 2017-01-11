exports = module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log("connection");
    socket.on('chat mounted', function(user) {
      socket.emit('receive socket', socket.id)
    })
    socket.on('leave channel', function(channel) {
      socket.leave(channel)
    })
    socket.on('join channel', function(channel) {
      console.log("Joining channel "+channel);
      socket.join(channel)
    })
    socket.on('new message', function(msg) {
      console.log("server got message:");
      console.log(msg);
      socket.broadcast.to(msg.channelId).emit('new bc message', msg);
    });
    socket.on('new channel', function(channel) {
      socket.broadcast.emit('new channel', channel)
    });
    socket.on('typing', function (data) {
      socket.broadcast.to(data.channel).emit('typing bc', data.user);
    });
    socket.on('stop typing', function (data) {
      socket.broadcast.to(data.channel).emit('stop typing bc', data.user);
    });
    socket.on('new private channel', function(socketID, channel) {
      socket.broadcast.to(socketID).emit('receive private channel', channel);
    })
  });
}
