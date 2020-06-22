import {ErrorHandler} from './codes';
import _ from 'lodash';

// Private Use
let libraries;

class ErrorManager {
    constructor(){
        libraries = {
            handler : new ErrorHandler(),
            throwError : function (err){
                throw err; 
            }
        }
    }

    log = function (object, type){
        try{
            switch(type){
            }
        }catch(err){
            throw err
        }
    }

    hello = function (object, type){
        try{
            switch(type){
               
            }
        }catch(err){
            throw err
        }
    }

    videogame = function (object, type){
        try{
            switch(type){
               
            }
        }catch(err){
            throw err
        }
    }

    match = function (object, type){
        try{
            switch(type){
               
            }
        }catch(err){
            throw err
        }
    }

    serie = function (object, type){
        try{
            switch(type){
               
            }
        }catch(err){
            throw err
        }
    }

    security = function (security, type){
        try{
            switch(type){
                case 'Register' : {  
                    // Verify wallet (Syntax Error)
                    if(typeof security == 'undefined' || Object.is(security, null))
                        throw libraries.throwError(libraries.handler.getError(libraries.handler.KEYS.USER_NOT_EXISTENT));
    
                }
            }
        }catch(err){
            throw err
        }
    }
}

export default ErrorManager;


const throwError = (typeError='UNKNOWN') => {
    throw libraries.throwError(libraries.handler.getError(libraries.handler.KEYS[typeError]));
}

export {
    throwError
}