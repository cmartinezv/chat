var express = require("express");
var app = express();
var port = 3700;
var sanitizer = require("sanitizer");
var emoticones = require("./emoticones");

//jade
app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

//render
app.get("/", function(req, res){
    emoticones.loadEmoticones(function(obj){
        if(obj.data){
            res.render("page", {
                emoticones : obj.data
            });
        }
    });
});

//socket io
var io = require('socket.io').listen(app.listen(port));
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
    	data.message = sanitizer.escape(data.message);
        io.sockets.emit('message', data);
    });

	socket.on('image', function (data) {
        data.message = emoticones.getImage({ code : data.message });
        io.sockets.emit('message', data);
   	});

});

app.use(express.static(__dirname + '/public'));
