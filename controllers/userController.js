const { response, request } = require('express');
const { where } = require('sequelize');
const { Usuario } = require('../models/usuario');


/****************** Acciones para el usuario ******************/

const usersGet = async (req, res = response) => {
  const usuarios = await Usuario.findAll();

  res.json({ usuarios });
}


const usersRegister = async(req, res = response) => {

  const body = req.body

  try {
    const existeEmail = await Usuario.findOne({
      where: {
        email: body.email
      }
    }) 

    if(existeEmail){
      return res.status(400).json({
        msg: 'EL email ' + body.email + ' ya fué asociado a un usuario, porfavor verifica e intenta nuevamente'
      });
    }
    const usuario = new Usuario(body);
    await usuario.save();

    res.json(usuario);

  } catch (error) {
    console.log('****Error', error)
    res.status(500).json({
      msg: 'Error desconocido, contacte con la secretaria de planeacion e informatica'
    })
  } 

}

const usersLogin = (req, res = response) => {
  const body = req.body;
  res.json({
    msj: 'Usuario login',
    body
  })
}

const updateCorreo = async(req, res = response) => {
  // const body = req.body;
  console.log('Body',req.body)
  const {id_user,email} = req.body;

  try {

    const usuario = await Usuario.findByPk(id_user);
    if(!usuario){
      return res.status(400).json({
        msg: "No existe ningun usuario  con el id " + id_user
      });
    }

    const existeEmail = await Usuario.findOne({
      where: {
        email: email
      }
    }) 

    if(existeEmail){
      return res.status(400).json({
        msg: 'EL email ' + email + ' ya fué asociado a un usuario, porfavor verifica e intenta nuevamente'
      });
    }    
    await usuario.update({where: {id_user:id_user}, email:email});

    res.status(200).send({
      replyCode: 200,
      replyText: "Se actualizo el correo correctamente",
    });

  } catch (error) {
    console.log('****Error', error)
    res.status(500).json({
      msg: 'Error desconocido, contacte con la secretaria de planeacion e informatica'
    })
  } 
}

module.exports = {
  usersGet,
  usersRegister,
  usersLogin,
  updateCorreo,
}