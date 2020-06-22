export function getGameProbablityNormalizer({metaName, x, y}){
    /* y = results that are equal to outcome - rubys */
    /* x = User Result Space */
    let ret = 0;
    switch(metaName){
        case 'keno_simple' : {
            if(x == 1){
                if(y == 0){ ret = 2.5; break; }
                if(y == 1){ ret = 0.36363636363; break; }
            }else if( x == 2){
                if(y == 0){ ret = 0; break; }
                if(y == 1){ ret = 0.55555555555; break; }
                if(y == 2){ ret = 0.19607843137; break; }
            }else if( x == 3){
                if(y == 0){ ret = 0; break; }
                if(y == 1){ ret = 0; break; }
                if(y == 2){ ret = 0.35714285714; break; }
                if(y == 3){ ret = 0.02; break; }
            }else if( x == 4){
                if(y == 0){ ret = 0; break; }
                if(y == 1){ ret = 0; break; }
                if(y == 2){ ret = 1/1.7; break; }
                if(y == 3){ ret = 1/10; break; }
                if(y == 4){ ret = 1/100; break; }
            }else if( x == 5){
                if(y == 0){ ret = 0; break; }
                if(y == 1){ ret = 0; break; }
                if(y == 2){ ret = 1/1.4; break; }
                if(y == 3){ ret = 1/4; break; }
                if(y == 4){ ret = 1/14; break; }
                if(y == 5){ ret = 1/390; break; }
            }else if( x == 6){
                if(y == 0){ ret = 0; break; }
                if(y == 1){ ret = 0; break; }
                if(y == 2){ ret = 0; break; }
                if(y == 3){ ret = 1/3; break; }
                if(y == 4){ ret = 1/9; break; }
                if(y == 5){ ret = 1/180; break; }
                if(y == 6){ ret = 1/710; break; }
            }else if( x == 7){
                if(y == 0){ ret = 0; break; }
                if(y == 1){ ret = 0; break; }
                if(y == 2){ ret = 0; break; }
                if(y == 3){ ret = 1/2; break; }
                if(y == 4){ ret = 1/7; break; }
                if(y == 5){ ret = 1/30; break; }
                if(y == 6){ ret = 1/400; break; }
                if(y == 7){ ret = 1/800; break; }
            }else if( x == 8){
                if(y == 0){ ret = 0; break; }
                if(y == 1){ ret = 0; break; }
                if(y == 2){ ret = 0; break; }
                if(y == 3){ ret = 1/2; break; }
                if(y == 4){ ret = 1/4; break; }
                if(y == 5){ ret = 1/11; break; }
                if(y == 6){ ret = 1/67; break; }
                if(y == 7){ ret = 1/400; break; }
                if(y == 8){ ret = 1/900; break; }
            }else if( x == 9){
                if(y == 0){ ret = 0; break; }
                if(y == 1){ ret = 0; break; }
                if(y == 2){ ret = 0; break; }
                if(y == 3){ ret = 1/2; break; }
                if(y == 4){ ret = 1/2.5; break; }
                if(y == 5){ ret = 1/5; break; }
                if(y == 6){ ret = 1/15; break; }
                if(y == 7){ ret = 1/100; break; }
                if(y == 8){ ret = 1/500; break; }
                if(y == 9){ ret = 1/1000; break; }
            }else if( x == 10){
                if(y == 0){ ret = 0; break; }
                if(y == 1){ ret = 0; break; }
                if(y == 2){ ret = 0; break; }
                if(y == 3){ ret = 1/1.6; break; }
                if(y == 4){ ret = 1/2; break; }
                if(y == 5){ ret = 1/4; break; }
                if(y == 6){ ret = 1/7; break; }
                if(y == 7){ ret = 1/26; break; }
                if(y == 8){ ret = 1/100; break; }
                if(y == 9){ ret = 1/500; break; }
                if(y == 10){ ret = 1/1000; break; }
            }
        }
    }
    return parseFloat(ret);
}