import { globals } from './Globals';
import { Logger } from './helpers/logger';
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
            queue.consume("beat", async message => {
                console.log(message);
            });
            queue.consume("fixture", async message => {
                console.log(message);
            });
            queue.consume("markets", async message => {
                console.log(message);
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