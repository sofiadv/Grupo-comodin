const fs = require('fs')
const path = require('path')
let rutaLog = path.join (__dirname,'../logs/UsersLog.txt');


function logMiddleware ( req, res, next){
    fs.appendFileSync(rutaLog , "El usuario ingreso a la ruta: " + req.path + '\n');
    next();
}

module.exports = logMiddleware