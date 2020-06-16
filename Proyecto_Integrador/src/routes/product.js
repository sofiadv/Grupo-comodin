const fs = require('fs')
var express = require('express');
var router = express.Router();
const path = require('path')
const multer = require('multer')
let { check, validationResult, body} = require('express-validator');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../mercadoliebre/public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })

//Ruta a la base de datos de producto. Cambiarle el nombre cuando se sepa

let rutaJson = path.join (__dirname,'../data/productsDataBase.json');
const productos = JSON.parse(fs.readFileSync(rutaJson ,'utf-8'));
const productController = require('../controllers/productController')

/* Rutas y controllers. */
router.get('/detail/:idProduct/', productController.detail);
router.get('/pruebas', productController.pruebas);
router.get('/', productController.products);
router.get('/create', productController.create);
router.post('/create', upload.any() ,productController.guardar);
router.get('/edit/:idProduct', productController.editar)
router.put('/edit/:idProduct', productController.editado)
router.delete('/delete/:idProduct', productController.delete)
router.get('/carrito', productController.carrito)


module.exports = router;
