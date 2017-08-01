var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(3000);

function handler (req, res) {
  fs.readFile(__dirname + '/client.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading client.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  socket.on('new user', function(data,callback){
  	callback(true);

    var newUser = data;
    var myName = data;
    io.sockets.emit('alert new user', newUser);
    io.to(socket.id).emit('change name', myName);


  });

  socket.on('send message', function(name, text){
    var msg = name + " : " + text;
    io.emit('receive message', msg);
  });
});