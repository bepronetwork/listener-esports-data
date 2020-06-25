import { globals } from './Globals';
import { Logger } from './helpers/logger';
import { QueueSingleton } from './logic/queue/queue';
require('dotenv').config();
const express = require('express')
const app = express()
const queue = require("./queue");


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
                switch (options.event_type) {
                    case 'match': {
                        QueueSingleton.pushQueue({func:Controllers.esport.matchESport, params: options});
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
        app.get('/', function (req, res) {
            res.send('Welcome')
        });
        const self = this;
        app.listen((process.env.PORT),function () {
            console.log(`Listening on port ${process.env.PORT}!`);
            self.startRabbit();
        });
    }
}

module.exports = (new App()).startServe();