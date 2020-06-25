class Queue {
    constructor(){
        this.inProcess = false;
        this.queue = [];
    }
    pushQueue(process) {
        this.queue.push(process);
    }
    async callQueue() {
        if(this.inProcess) return;
        this.inProcess=true;
        while( this.queue.length > 0 ) {
            await this.queue[0].func(this.queue[0].params);
            this.queue.shift();
        }
        this.inProcess=false;
    }
}
const QueueSingleton = new Queue();
export {
    QueueSingleton
}
