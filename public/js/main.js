//the require library is configuring paths
require.config({
    paths: {
        "jquery": "libs/jquery/dist/jquery",
        "chat": "chat",
        "socketio": '../socket.io/socket.io',
        "bootstrap" : 'libs/bootstrap/dist/bootstrap.min'
    },
    'socketio': {
      exports: 'io'
    },
    shim: {
        'bootstrap': {
            deps : ['jquery']
        }
    },
    //how long the it tries to load a script before giving up, the default is 7
    waitSeconds: 10
});


define(['chat'], function(Chat) {

});