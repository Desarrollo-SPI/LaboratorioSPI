
const path = require('path')
const { response, request } = require('express')

/****************** Acciones para las imagenes ******************/

const getImg = (req, res = response) => {

  res.json({
    nombre: 'img_001.png',
  })
}

const insertImg = (req, res = response) => {

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).send({
      replyCode: 400,
      replyText: 'No hay archivos para subir'
    });
    return;
  }

  const {archivo} = req.files;
  const nombreCortado = archivo.name.split('.');
  const extension = nombreCortado[nombreCortado.length-1];

  //Validar la extension
  const extensionesValidas = ['png','jpg','jpeg'];

  if(!extensionesValidas.includes(extension)){
    res.status(400).send({
      replyCode: 400,
      replyText: `El tipo de archivo ${extension} no es valido, solo se aceptan: ${extensionesValidas}`
    });
  }

  res.status(200).send({
    replyCode: 200,
    replyText: 'Archivo cargado exitosamente, con extension: ' + extension
  })

  // const uploadPath = path.join(__dirname,'../uploads/',archivo.name);

  // archivo.mv(uploadPath, (err)=> {
  //   if (err) {
  //     return res.status(500).send({
  //       replyCode: 500,
  //       replyText: 'Error desconocido, contacte con la secretaria de planeacion e informatica',
  //       err
  //     });
  //   }
  //   return res.status(200).send({
  //     replyCode: 200,
  //     replyText: 'Archivo cargado exitosamente a la ruta ' + uploadPath
  //   })
  // });

  // console.log(req.files);

  
}

module.exports = {
  insertImg,
  getImg,
}