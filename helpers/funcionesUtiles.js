const { Usuario } = require("../models/usuario");

const emailExiste = async (email = '') => {

  //Verifica si hay un usuario con el mismo email
  const existeEmail = await Usuario.findOne({
    where: {
      email: email
    }
  })

  if (existeEmail) {
    throw new Error(`EL email ${email} ya fué asociado a un usuario, porfavor verifica e intenta nuevamente`)
  }

}

const usuarioExiste = async (user_name = '') => {

  if(!user_name){
    throw new Error('El nombre de usuario es obligatorio')
  }

  //Verifica si hay un usuario con el mismo nombre
  const existeUser = await Usuario.findOne({
    where: {
      user_name: user_name
    }
  }) 

  //respuesta si hay algun error
  if(existeUser){
    throw new Error(`El nombre de usuario ${user_name} ya esta registrado, porfavor verifica e intenta nuevamente`)
  }
}


module.exports = {
  emailExiste,
  usuarioExiste,
}