'use strict';

var express    = require('express'),
    app        = express(),
    config     = require('./server.config.js');
    
class Server {
    constructor(port){
        this.port = port;
    }
    
    initExpress(){
        app.use(express.static(__dirname + '/src'));
        app.use('*', function(req, res){
            res.sendFile(__dirname + '/src/index.html');
        });
    }
    
    run(){
        this.initExpress();
        app.listen(this.port);
        console.log('Сервер запущен на порте ' + this.port);
    }
}

var server = new Server(config.port);
server.run();

module.exports = Server;

