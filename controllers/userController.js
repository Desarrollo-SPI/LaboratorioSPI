const { response, request } = require('express');
const { Usuario } = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');
const bcryptjs = require('bcryptjs');



/****************** Trae todos los usuarios ******************/

const usersGet = async (req, res = response) => {
  const usuarios = await Usuario.findAll();
  res.status(200).send({ data: usuarios });
}


/****************** Login del usuario ******************/

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
    const token = await generarJWT(usuario.id_user)
    

    res.status(200).send({
      replyCode: 200,
      replyText: 'Usuario logeado',
      data: {
        user_name,
        token
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



/****************** Registro de usuarios ******************/

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


/****************** Actualiza el correo ******************/

const updateCorreo = async(req, res = response) => {
  const {id_user,email} = req.body;
  const id = req.id_user
  try {         
    const usuario = await Usuario.findByPk(id_user);
    if(!usuario){      
      return res.status(400).send({
        replayCode: 400,
        replyText: `No existe ningun usuario  con el id ${id_user}`
      })
    }

    if(id != 13){
      return res.status(400).send({
        replayCode: 400,
        replyText: 'Esta accion solo puede realizarla el Administrador (Desarrollo)'
      })
    }

    await usuario.update({where: {id_user:id_user}, email:email});
    res.status(200).send({
      replyCode: 200,
      replyText: "Se actualizo el correo correctamente",
      msg: `El usuario que realizo la accion tiene el id: ${id}`
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