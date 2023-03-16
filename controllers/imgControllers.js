
const { response, request } = require('express');
const { cargarArchivos } = require('../helpers');
const {Archivo} = require('../models/archivo');

/****************** Acciones para las imagenes ******************/

const getImg = (req, res = response) => {

  res.json({
    nombre: 'img_001.png',
  })
}

const insertImg = async(req, res = response) => {

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).send({
      replyCode: 400,
      replyText: 'No hay archivos para subir'
    });
    return;
  }

  try {
    const pathArchivo = await cargarArchivos(req.files,/* ['tipos'],'sub-carpeta' */);

    //Armamos la ruta a cargar en la BD
    const rutaCortada = pathArchivo.split('/');
    const fileName = rutaCortada[rutaCortada.length - 1];
    const fileUrl = '/' + rutaCortada[rutaCortada.length - 2] + '/' + rutaCortada[rutaCortada.length - 1];
    
    //Creamos la instancia de Archivo y la guardamos en la Base de datos,
    const archivo = new Archivo({fileName,fileUrl})
    await archivo.save();
    res.status(200).send({
      replyCode: 200,
      replyText: 'Se cargó correctamente el archivo en la ruta: ', pathArchivo
    }) 

  console.log(req.files);
  } catch (error) {
    res.status(400).send({
      replyCode: 400,
      replyText: 'No se ha podido cargar correctamente el archivo: ',error
    }) 
  }

  

  
}

module.exports = {
  insertImg,
  getImg,
}