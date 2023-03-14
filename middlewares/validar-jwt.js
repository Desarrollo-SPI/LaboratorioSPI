const { response, request } = require('express')
const JWT = require('jsonwebtoken')

const validarJWT = (req = request, res = response, next) => {

  const token = req.header('x-api-key')

  if (!token) {
    return res.status(401).send({
      replyCode: 401,
      replyText: 'No existe autenticacion',
    },)
  }

  try {
    const {id_user} = JWT.verify(token,process.env.SECRETORPRIVATEKEY);
    req.id_user = id_user
    console.log('***ID DEL USUARIO AUTORIZADO', id_user)

    next();

  } catch (error) {
    console.log('***TOKEN ERROR', error)
    return res.status(401).send({
      replyCode: 401,
      replyText: 'Token no valido',
    },)
  }
  

}


module.exports = {
  validarJWT
}