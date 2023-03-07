const express = require('express');
const cors = require('cors')

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userRoutesPath = '/laboratorioSPI/usuarios/';

        //Midelwares 
        this.middelwares();

        //Rutas de la aplicacion
        this.routes();
    }

    middelwares(){

        //cors
        this.app.use(cors())

        //lectura y parseo dek body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'))
    }

    routes(){
        
        this.app.use(this.userRoutesPath, require('../routes/userRegister'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Todo bien',this.port)
        })
    }
}

module.exports = Server