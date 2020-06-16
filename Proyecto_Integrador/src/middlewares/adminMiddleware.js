const fs = require('fs')
const path = require('path')

//Fijarse la nueva base de admins para cambiarla
let rutaUsuarios = path.join (__dirname,'../data/admins.json');
let admin = JSON.parse(fs.readFileSync(rutaUsuarios ,'utf-8'))

function adminMiddleware ( req, res, next){
    let permiso = admin.find( user => req.query.user == user.usuario)
    if (typeof permiso != 'undefined'){
        next();
    }
    else {
        res.send('Este usuario no tiene permisos de administrador')
    }
}

module.exports = adminMiddleware