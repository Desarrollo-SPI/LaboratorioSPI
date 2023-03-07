const {response, request} = require('express')

const usersGet = (req, res = response) => {

    const {apikey='1234'} = req.query;

    res.json({
        nombre: 'Arce Castillo Pedro David',
        apikey
    })
}

const usersPut = (req, res = response) => {

    const {id} = req.params;

    res.json({
        msg: 'Put',
        id
    })
}

const usersPost = (req, res = response) => {

    const {nombre, username} = req.body;

    res.json({        
        msg: 'Post',
        nombre,
        username
    })
}

const usersDelete = (req, res = response) => {
    res.json({
        msg: 'Delete'
    })
}


module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}