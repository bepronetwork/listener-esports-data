import { RABBIT_URL_QUEUE_BET } from './config';
const amqplib = require('amqplib');
var channelLocal = null;
function connect(){
    return amqplib.connect(RABBIT_URL_QUEUE_BET).then(conn => conn.createChannel());
  }
  function createQueue(channel, queue){
    return new Promise((resolve, reject) => {
      try{
        channel.prefetch(1);
        channelLocal = channel;
        channel.assertQueue(queue, { durable: true, autoDelete: false });
        resolve(channel);
      }
      catch(err){ reject(err) }
    });
  }
  function getChannel() {
    return channelLocal;
}
  function consume(queue, callback){
    connect()
      .then(channel => createQueue(channel, queue))
      .then(channel => channel.consume(queue, callback, { noAck: false }))
      .catch(err => console.log(err));
  }
 export {
    consume,
    getChannel
  }
