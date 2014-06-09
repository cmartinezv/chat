var fs = require('fs');
var file = __dirname + '/data/emoticones.json';

var emoticones = [];

exports.loadEmoticones = function(callback){
	fs.readFile(file, 'utf8', function (err, data) {
	  if (err) {
	    console.log('Error: ' + err);
	    return;
	  }
	 
	  emoticones = JSON.parse(data);
	 
	 if(typeof callback === "function"){
	 	callback({ data : emoticones });
	 }
	  
	});
}

exports.getImage = function(params) {
	var icoH = 50,
		icoW = 50,
		x,y, emo, html = '';

	if (params.code) {
		for (var i = 0; i < emoticones.length; i++) {
			emo = emoticones[i];
			if( emo.code === params.code){
				x = emo.position.x * icoH;
				x = x > 0 ? "-"+x+"px" : 0; 

				y = emo.position.y * icoW;
				y = y > 0 ? "-"+y+"px" : 0;
				html = '<span class="emoticon" style="background-position:'+x+' '+y+';"/><br>';
				break;
			}
		};
	};

	return html;
};

exports.emoticones = emoticones;