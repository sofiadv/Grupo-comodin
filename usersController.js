const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs')
let { check, validationResult, body} = require('express-validator');

// Fijarse la base de datos y cambiarle el nombre

let rutaJson = path.join (__dirname,'../data/usersDataBase.json');
const usuarios = JSON.parse(fs.readFileSync(rutaJson ,'utf-8') || '[]');

// Fijarse bien los metodos y las páginas

let usersController = {
    register: ( req, res) => res.render('formulario-usuario'),
    guardar: ( req, res, next) => {
        let errors = validationResult(req);
        if (errors.isEmpty() && req.body.password == req.body.repassword) {
            let newUser = {}
            if (usuarios.length == 0){
                    newUser.id = 1
            }
            else if (usuarios.length > 0) {
                    newUser.id = usuarios[usuarios.length -1].id + 1
            }
                newUser.nombre = req.body.nombre;
                newUser.email = req.body.email;
                newUser.password = bcrypt.hashSync(req.body.password);
        let newUserDB = [...usuarios, newUser]
        fs.writeFileSync(rutaJson ,JSON.stringify(newUserDB, null, ' '))
        res.redirect('/users')
        }
        else {
        return res.render('formulario-usuario', {errors: errors.errors})
        }
    },
    login: (req, res) => res.render('login'),
    auth: (req, res, next) => {
        let errors = validationResult(req);
        let usuarioEncontrado = usuarios.find( usuario => req.body.email == usuario.email)  
        if (typeof usuarioEncontrado != 'undefined' && errors.isEmpty()){   
        let autorizado = bcrypt.compareSync(req.body.password, usuarioEncontrado.password)
            if (autorizado) {
                res.redirect('/usuario/profile')
            }
            else{
                res.render("login", {errors: 'Contraseña incorrecta'})
            }
        }
        else {
            res.render('login', {errors: errors.errors})
        }
    
    },
    listar: (req,res,next) => res.send(usuarios),
};

module.exports = usersController;