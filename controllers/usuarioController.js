const validationResult = require('express-validator')
const check = require('express-validator')
const Usuario = require('../models/Usuario.js')

const formularioLogin = async (req, res) => {
    // Revisamos q los params no sean vacios...

    // Validamos que exista el usuario y que su contraseña sea vàlida
    const { email, password} = req.body
    const usuario = await Usuario.findOne({where : {email } })
    //!usuario -> no existe

    //if(!usuario.verificarP)
}

export {
    formularioLogin
}