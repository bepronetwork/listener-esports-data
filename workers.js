const throng = require('throng');

var WORKERS = process.env.WEB_CONCURRENCY || 1;

throng(WORKERS, ()=>{
    require("./src/app");
});
