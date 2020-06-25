class IO {
    constructor(){
        this.io = null;
    }
    push(io) {
        this.io = io;
    }
    getIO() {
        return this.io;
    }
}
const IOSingleton = new IO();
export {
    IOSingleton
}
