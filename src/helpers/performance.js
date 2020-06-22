import perf from 'execution-time';


class PerfomanceMonitor{
    constructor({id, print=true}){
        if(!id){id = 'test'}
        this.perfs = {
            
        }
        this.id = id;
        this.print = print;
    }

    start({id}){
        if(!id){throw new Error("Not Id provided to end performance view - Perfomannce Monitor")}
        let perfFunction = perf();
        this.perfs[id]= perfFunction;
        this.perfs[id].start();
    }

    end({id}){
        if(!id){throw new Error("Not Id provided to end performance view - Perfomannce Monitor")}
        this.results = this.perfs[id].stop();
        if(this.print){
            console.log(`${id} took ${this.results.time/1000} seconds`);  // in milliseconds
        }
    } 

    getResult(){
        return this.results.time;
    }
}


export default PerfomanceMonitor;