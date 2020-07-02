import { globals } from './Globals';
import { Logger } from './helpers/logger';
import { QueueSingleton } from './logic/queue/queue';
import { IOSingleton } from './logic/utils/io';
require('dotenv').config();
const app = require('express')();
const queue = require("./queue");
const http = require('http').createServer(app);
const io = require('socket.io')(http);

class App {

    async __init__() {
        await globals.__init__();
        Logger.success("Online");
        return ;
    }

    startRabbit(){
        this.__init__().then(()=>{
            const Controllers = require('./api/controllers');
            queue.consume("my_queue", async message => {
                const options = JSON.parse(message.content.toString());
                console.log(options);
                switch (options.event_type) {
                    case 'match': {
                        QueueSingleton.pushQueue({func:Controllers.esport.matchESport, params: {...options, match_id: options.event_id}});
                        break;
                    }
                    case 'game':{
                        QueueSingleton.pushQueue({func:Controllers.esport.matchESport, params: options});
                        break;
                    }
                }
                QueueSingleton.callQueue();
            });
        });
    }
    startServe(){
        IOSingleton.push(io);
        app.get('/', function (req, res) {
            res.send('Welcome')
        });

        io.on('connection', (socket) => {
            console.log('Socket ON');
            socket.on("room", (data) => {
                socket.join(data.roomId);
            });
        });

        const self = this;
        http.listen((process.env.PORT),function () {
            console.log(`Listening on port ${process.env.PORT}!`);
            self.startRabbit();
        });
    }
}

module.exports = (new App()).startServe();