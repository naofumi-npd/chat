var express = require("express");
var socket = require('socket.io');
var routes = require('./routes/index');


var app = express();
var port = 3700;

app.set('views', __dirname + '/views');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));

app.use('/', routes);
app.use('/login', routes);
app.use('/register', routes);
app.use('/forget', routes);
 
var io = socket.listen(app.listen(port));

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'You are connected' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});


console.log("Listening on port " + port);
