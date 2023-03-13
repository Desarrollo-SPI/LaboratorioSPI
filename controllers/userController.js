const { response, request } = require('express');
const { Usuario } = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');


/****************** Acciones para el usuario ******************/

const usersGet = async (req, res = response) => {
  const usuarios = await Usuario.findAll();
  res.status(200).send({ data: usuarios });
}


const usersRegister = async(req, res = response) => {

  //valida los midelwares 
  const errores = validationResult(req);
  
  console.log('Errrs',errores)
  if(!errores.isEmpty()){
    return res.status(400).send({
      replyCode: 400,
      replyText: 'Parametros incorrectos',
      errores
      
    },)
  }

  const {email,user_name,password} = req.body

  try {

    //Verifica si hay un usuario con el mismo email
    const existeEmail = await Usuario.findOne({
      where: {
        email: email
      }
    }) 

    //respuesta si todo sale bien
    if(existeEmail){
      return res.status(400).send({
        replyCode: 400,
        replyText: 'EL email ' + email + ' ya fué asociado a un usuario, porfavor verifica e intenta nuevamente'
      });
    }

    //Verifica si hay un usuario con el mismo nombre
    const existeUser = await Usuario.findOne({
      where: {
        user_name: user_name
      }
    }) 

    //respuesta si hay algun error
    if(existeUser){
      return res.status(400).send({
        replyCode: 400,
        replyText: 'El nombre de usuario ' +  user_name + ' ya esta registrado, porfavor verifica e intenta nuevamente'
      });
    }

    //Creamos una instancia del modelo usuario
    const usuario = new Usuario({email,user_name,password});

    //Hash para la contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password,salt);

    //Guardar en base de datos
    await usuario.save();

    //respuesta si todo sale bien
    res.status(200).send({
      replyCode: 200,
      replyText: 'Usuario registrado exitosamente',
      data:{
        user_name,
        email
      }
    });

  } catch (error) {
    console.log('****Error', error)
    res.status(500).send({
      replyCode: 500,
      replyText: 'Error desconocido, contacte con la secretaria de planeacion e informatica'
    })
  } 

}

const usersLogin = (req, res = response) => {
  const body = req.body;
  res.status(200).send({
    replyCode: 200,
    replyText: 'Usuario logeado',
    data: body
  })
}

const updateCorreo = async(req, res = response) => {

  const {id_user,email} = req.body;

  try {

    const usuario = await Usuario.findByPk(id_user);
    if(!usuario){
      return res.status(400).send({
        replyCode: 400,
        replyText: "No existe ningun usuario  con el id " + id_user
      });
    }

    const existeEmail = await Usuario.findOne({
      where: {
        email: email
      }
    }) 

    if(existeEmail){
      return res.status(400).send({
        replyCode: 400,
        replyText: 'EL email ' + email + ' ya fué asociado a un usuario, porfavor verifica e intenta nuevamente'
      });
    }    
    await usuario.update({where: {id_user:id_user}, email:email});
    res.status(200).send({
      replyCode: 200,
      replyText: "Se actualizo el correo correctamente",
    });

  } catch (error) {
    console.log('****Error', error)
    res.status(500).send({
      replayCode: 500,
      replyText: 'Error desconocido, contacte con la secretaria de planeacion e informatica'
    })
  } 
}

module.exports = {
  usersGet,
  usersRegister,
  usersLogin,
  updateCorreo,
}