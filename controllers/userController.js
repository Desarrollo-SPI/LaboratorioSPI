const { response, request } = require('express');
const { Usuario } = require('../models/usuario');
const bcryptjs = require('bcryptjs');



/****************** Acciones para el usuario ******************/

const usersGet = async (req, res = response) => {
  const usuarios = await Usuario.findAll();
  res.status(200).send({ data: usuarios });
}


const usersLogin = async(req, res = response) => {
  const {user_name,password} = req.body;

  try {

    // Verificar si el usuario es valido
    const usuario = await Usuario.findOne({
      where: {
        user_name: user_name
      }
    })   
    //respuesta si no existe el usuario
    if(!usuario){
       return res.status(400).send({
        replyCode: 400,
        replyText: 'Usuario / Contraseña incorrectos'
      })
    }


    // Verificar si la contraseña es correcta
    const validPassword = bcryptjs.compareSync(password, usuario.password)
    if(!validPassword){
       return res.status(400).send({
        replyCode: 400,
        replyText: 'Usuario / Contraseña incorrectos'
      })
    }

    //Generamos el JWT
    const token = await (usuario.id_user)

    res.status(200).send({
      replyCode: 200,
      replyText: 'Usuario logeado',
      data: {
        user_name,
        password
      }
    })    
  } catch (error) {
    console.log('****Error', error)
    res.status(500).send({
      replyCode: 500,
      replyText: 'Error desconocido, contacte con la secretaria de planeacion e informatica'
    })
  }  
}

const usersRegister = async(req, res = response) => {

  const {email,user_name,password} = req.body

  try {        
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

const updateCorreo = async(req, res = response) => {
  const {id_user,email} = req.body;
  try {         
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