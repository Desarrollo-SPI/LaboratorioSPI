const funcionesUtiles = require('./funcionesUtiles');
const generarJWT = require('./generarJWT');
const cargarArchivos = require('./cargar-archivos');


module.exports= {
    ...funcionesUtiles,
    ...generarJWT,
    ...cargarArchivos,
}