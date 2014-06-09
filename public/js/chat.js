define(["jquery","socketio"],function($,io) {
    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var $field = $("#field"),
        $sendButton = $("#send"),
        $content = $("#content"),
        $select_emoticonos = $("#sel-emoticonos"),
        $name = $("#name"),
        username;


    function checkUsername(){
        var name = $name.val();

        if(name === "") {
            alert("Please type your name!");
            return false;
        } else {
            username = name;
            return true;
        }
    }

    socket.on('message', function (data) {
        if(data.message) {
            var html = '', 
                message = data.message;

            html += '<b>' + (data.username ? data.username : 'Server') + ': </b>'+ message + '<br />';
            $content.append(html);
            $content[0].scrollTop = $content[0].scrollHeight;
        } else {
            console.log("There is a problem:", data);
        }
    });

    $field.keydown(function(ev){
            if(ev.keyCode == 13) $sendButton.click();
    });
 
    $sendButton.on("click", function() {
        if(checkUsername()){
            var text = $field.val();
            $field.val("");
            socket.emit('send', { message: text, username: username });           
        }
    });

    $select_emoticonos.on("change", function(){
        var $self = $(this);
          
        if(checkUsername()){
            socket.emit('image', { message: $self.val(), username : username});            
        }
        $self.val("");
    });


    return {
        clear : function(){
            $content.html("");
        }
    }
});