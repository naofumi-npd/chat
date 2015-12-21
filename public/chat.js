window.onload = function() {
 
    var messages = [];
    var socket = io.connect('http://' + document.domain + ':3700');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");
 
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html += messages[i].message + '<br />';
            }
            content.innerHTML = html;
            $("#content").scrollTop($("#content")[0].scrollHeight);
            
            newMessage = true;    
             
        } else {
            console.log("There is a problem:", data);
        }
    });
 
    sendButton.onclick = function() {
        if(name.value == "") {
            alert("Please type your name!");
        } else {
            var text = field.value;
            socket.emit('send', { message: text, username: name.value });
            $("#field").val("");

        }
    };
}


$(document).ready(function() {
    $("#content").scrollTop($("#content")[0].scrollHeight);

    $("#field").keyup(function(e) {
        if(e.keyCode == 13) {
            $('#send').trigger('click');
            $("#field").val("");
        }
    });
});


var PageTitleNotification = {
    Vars:{
        OriginalTitle: document.title,
        Interval: null
    },    
    On: function(notification, intervalSpeed){
        var _this = this;
        _this.Vars.Interval = setInterval(function(){
             document.title = (_this.Vars.OriginalTitle == document.title)
                                 ? notification
                                 : _this.Vars.OriginalTitle;
        }, (intervalSpeed) ? intervalSpeed : 500);
    },
    Off: function(){
        clearInterval(this.Vars.Interval);
        document.title = this.Vars.OriginalTitle;   
    }
}


var isActive;
var newMessage = false;
var notificationOn = false;

window.onfocus = function () { 
  isActive = true; 
}; 

window.onblur = function () { 
  isActive = false; 
}; 


setInterval(function () { 
  if(window.isActive === false && newMessage == true){
    if(notificationOn === false){
        notificationOn = true;
        PageTitleNotification.On("New Chat Message!");    
    }
  } else {
    PageTitleNotification.Off();
    notificationOn = false;
    newMessage = false;
  }
}, 500);

