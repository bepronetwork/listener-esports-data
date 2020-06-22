

var ErrorHandler = function(){}


ErrorHandler.prototype.errors = require('./codes.json');

/***************************
 * 
 *  @param { DEFINE KEYS }
 *        
 *         ALL KEYS
 * 
 ****************************/

ErrorHandler.prototype.KEYS =  {
    'UNKNOWN'                               : "000"
};

/***************************
 *
 *
 *         GET METHODS
 *
 *
 ****************************/
ErrorHandler.prototype.getMessage = function(code){
    return this.errors[code].message;
}

ErrorHandler.prototype.getKey = function(code){
    return this.errors[code].key;
}

ErrorHandler.prototype.getError = function(code){
    console.log("code", code);
    return {
        key     : this.getKey(code),
        code    : parseInt(code),
        message : this.getMessage(code)
    }
}


ErrorHandler.prototype.getCode = (code) => {
    let codes = Object.keys(this.errors);
    return codes.find( c => c.equals(code));
}


module.exports = ErrorHandler;
