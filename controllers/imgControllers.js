const {response, request} = require('express')

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
    insertImg,
    getImg,
}