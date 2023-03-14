const { validationResult } = require('express-validator');
const { request } = require("express");

const  validaciones = (req,res,next) =>{

  //valida los midelwares 
  const errores = validationResult(req);
  
  console.log('***Errores',errores)
  if(!errores.isEmpty()){
    return res.status(400).send({
      replyCode: 400,
      replyText: 'Parametros incorrectos',
      errores      
    },)    
  }
  
  next();
}

module.exports = {
    validaciones
}