const fs = require('fs')
var express = require('express');
var router = express.Router();
let { check, validationResult, body} = require('express-validator');
let adminMiddleware = require('../middlewares/adminMiddleware')

const mainController = require('../controllers/mainController')

/* GET home page. */
router.get('/', mainController.home)
router.get('/ofertas', mainController.ofertas)
router.get('/admin', adminMiddleware, mainController.admin)

module.exports = router;
