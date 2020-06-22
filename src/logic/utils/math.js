class math{
    constructor(){}

    multiplyAbsolutes(...args){
        return args.reduce((acc, arg) => {
            return acc*parseFloat(arg);
        }, 1);
    }

    toFloatPositiveNDecimal(value, decimal = 6, min = 0.000001) {
        if(value < min && value!=0) return { value: min, noMin: false};
        return { value: parseFloat(parseFloat(value).toFixed(decimal)), noMin: true};
    }

    toFloat(number){
        return parseFloat(parseFloat(Math.abs(number)).toFixed(2));
    }
}

let MathSingleton = new math();

export default MathSingleton;