const express = require('express');
const cors = require('cors');
const db = require('../db/conection');
const fileUpload = require('express-fileupload')

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userRoutesPath = '/api/laboratorioSPI';
        this.dbConnection();
        //Midelwares 
        this.middelwares();

        //Rutas de la aplicacion
        this.routes();
    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (error) {
            throw new Error(error);
        }
    }

    middelwares(){

        //cors
        this.app.use(cors())

        //lectura y parseo del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'))

        //carga de archivos 
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        
        this.app.use(this.userRoutesPath, require('../routes/laboratorioSPI'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto:',this.port)
        })
    }
}

module.exports = Server