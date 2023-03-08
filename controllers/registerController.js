const {response, request} = require('express')

/****************** Acciones para el usuario ******************/

const usersGet = (req, res = response) => {    

    res.json({
        nombre: 'Arce Castillo Pedro David',
    })
}

const usersRegister = (req, res = response) => {
    const {}= req.body;
    res.json({        
        body
    })
}

const usersLogin = (req, res = response) => {
    const body = req.body;
    res.json({        
        body
    })
}

const updateCorreo = (req, res = response) => {
    const body = req.body;
    res.json({        
        body
    })
}

/****************** Acciones para las imagenes ******************/

const getImg = (req, res = response) => {    

    res.json({
        nombre: 'img_001.png',
    })
}

const insertImg = (req, res = response) => {
    const body = req.body;
    res.json({        
        body
    })
}

module.exports = {
    usersGet,
    usersRegister,
    usersLogin,
    updateCorreo,
    insertImg,
    getImg,
}