const {response, request} = require('express')

// const usersGet = (req, res = response) => {    

//     res.json({
//         nombre: 'Arce Castillo Pedro David',
//     })
// }


const usersPost = (req, res = response) => {

    const body = req.body;

    res.json({        
        body
    })
}


module.exports = {
    // usersGet,
    usersPost,

}