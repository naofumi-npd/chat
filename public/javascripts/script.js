$(document).ready(function() {
    $("#content").scrollTop($("#content")[0].scrollHeight);

    $("#field").keyup(function(e) {
        if(e.keyCode == 13) {
            $('#send').trigger('click');
            $("#field").val("");
        }
    });
});

var notificationCounter = 0;
var notificationList = ["New Chat Message!", "Hey, You got a message",  "Open now dummy", "Free bacon here!"]


var PageTitleNotification = {
    Vars:{
        OriginalTitle: document.title,
        Interval: null
    },    
    On: function(notification, intervalSpeed){
        var _this = this;

        
        _this.Vars.Interval = setInterval(function(){
            
            if(notificationCounter >notificationList.length - 1){
                notificationCounter = 0;
            }
            
             document.title = (_this.Vars.OriginalTitle == document.title)
                                 ? notificationList[notificationCounter++]
                                 : _this.Vars.OriginalTitle;
        
        }, (intervalSpeed) ? intervalSpeed : 750);
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
    notificationCounter = 0;
  }
}, 500);

