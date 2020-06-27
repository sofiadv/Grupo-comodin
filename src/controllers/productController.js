const fs = require('fs')
const path = require('path')
let { check, validationResult, body} = require('express-validator');

// Fijarse la base de datos y cambiarle el nombre

let rutaJson = path.join (__dirname,'../data/productsDataBase.json');
const productos = JSON.parse(fs.readFileSync(rutaJson ,'utf-8'));


// Fijarse bien los metodos y las páginas

let productController = {
    detail: function(req, res) {
        let producto = req.params.idProduct
        let productId = productos.find ( ({id}) => id == producto);
        if (productId == undefined ){
                res.send("No encontramos un producto para mostrarte")
        }
        else {
          res.render('detalle', {productId})
        }
      },
      pruebas: function(req, res){
        res.render('pruebas', {productos})
      }, 
      products: function (req, res){
        res.render('product', {productos})
      },
      create: function (req,res,next) {
        res.render('formulario-producto', {productos})
      },
      guardar: function (req, res, next) {
        let productoNuevo = {
          id: productos[productos.length - 1].id + 1,
          product: req.body.product,
          marca: req.body.marca,
          categoria: req.body.categoria,
          subcategoria: req.body.subcategoria,
          unidadesDisponibles: req.body.unidadesDisponibles,
          descripcion: req.body.descripcion,
          precio: req.body.precio,
          //image: req.files[0].filename
        }
        productos.push(productoNuevo)
        fs.writeFileSync(rutaJson ,JSON.stringify(productos, null, ' '))
        res.send(productos)
      },
      editar: function (req, res) {
        let producto = req.params.idProduct
        let productId = productos.find ( ({id}) => id == producto);
        if (productId == undefined ){
                res.send("No encontramos un producto para mostrarte")
        }
        else {
          res.render('formulario-producto-edit', {productId})
        }
      },
      editado: function (req, res) {
        let productId = req.params.idProduct;
        productos.forEach(productoCambiado => {
          if ( productoCambiado.id == productId){
            productoCambiado.product = req.body.product,
            productoCambiado.marca = req.body.marca,
            productoCambiado.categoria = req.body.categoria,
            productoCambiado.subcategoria = req.body.subcategoria,
            productoCambiado.unidadesDisponibles = req.body.unidadesDisponibles,
            productoCambiado.descripcion = req.body.descripcion,
            productoCambiado.precio = req.body.precio
        }});
        fs.writeFileSync(rutaJson ,JSON.stringify(productos, null,' '))
        res.redirect('/products/detail/' + productId)
       },
       delete: function (req, res) {
         let producto = req.params.idProduct;
         let productId = productos.find ( ({id}) => id == producto);
         let posicion = productos.indexOf(productId);
         productos.splice(posicion, 1);
         fs.writeFileSync(rutaJson ,JSON.stringify(productos, null,' '))
         res.redirect('/products')
       },
       carrito: (req,res,next) => res.render('productCart')
    };



module.exports = productController;