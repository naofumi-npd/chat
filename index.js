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
 
    	data.message = '(' + getDateTime() + ') ' + data.message;
        io.sockets.emit('message', data);
    });
});


console.log("Listening on port " + port);

function getDateTime() {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
        var month = '0'+month;
    }
    if(day.toString().length == 1) {
        var day = '0'+day;
    }   
    if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        var second = '0'+second;
    }   
    var dateTime = month+'/'+day+'/'+year+' '+hour+':'+minute+':'+second;   
     return dateTime;
}
