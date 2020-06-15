const fs = require('fs')
var express = require('express');
var router = express.Router();
const path = require('path')
const multer = require('multer')
let { check, validationResult, body} = require('express-validator');
let rutaJson = path.join (__dirname,'../data/usersDataBase.json');

//Ruta a la base de datos de producto. Cambiarle el nombre cuando se sepa

const usuarios = JSON.parse(fs.readFileSync(rutaJson ,'utf-8') || '[]');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../mercadoliebre/public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })


const usersController = require('../controllers/usersController')

/* Rutas y controllers. */
router.get('/', usersController.listar)
router.get('/register', usersController.register)
router.post('/register', [
    check('nombre').not().isEmpty().withMessage('Este campo es obligatorio'),  
    check('email').isEmail().withMessage('Este campo debe contener un Email'), 
    check('password').isLength({min: 8}).withMessage('La contraseña debe tener por lo menos 8 dígitos'), 
    check('repassword').isLength({min: 8}).withMessage('Debe reingresar la contraseña puesta en el campo anterior'),
    body('email').custom(function(value) {
        for (let i = 0; i < usuarios.length; i++ ){
            if (value == usuarios[i].email){
                return false
            }
        }
        return true
     } ).withMessage("Email ya registrado")], 
    usersController.guardar)
router.get('/login', usersController.login)
router.post('/auth', [
      check('email').isEmail().withMessage('Este campo debe contener un Email'),
      check('password').not().isEmpty().withMessage('Contraseña erronea')], 
      usersController.auth)


module.exports = router;