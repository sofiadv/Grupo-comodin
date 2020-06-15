const fs = require('fs')
const path = require('path')
let { check, validationResult, body} = require('express-validator');

// Fijarse la base de datos y cambiarle el nombre

let rutaJson = path.join (__dirname,'../data/productsDataBase.json');
const productos = JSON.parse(fs.readFileSync(rutaJson ,'utf-8'));

// Fijarse bien los metodos y las páginas

let mainController = {
    home: function(req, res, next) {
        res.render('index');
      },
      ofertas: function (req, res) {
        res.render('ofertasIndex', {productos})
      },
      admin: (req, res) => res.send('Bienvenido ' + req.query.user)
    };



module.exports = mainController;