const { Router } = require('express');
const { check } = require('express-validator');
const {
  usersRegister,
  usersGet,
  usersLogin,
  updateCorreo,
} = require('../controllers/userController');

const { insertImg, getImg,} = require('../controllers/imgControllers');

const router = Router();

//Rutas de los endpoints con validaciones previas

router.get('/getUser', usersGet)

router.post('/registro',[
  check('user_name','El nombre de usuario es obligatorio').not().isEmpty(),
  check('email','El correo es obligatorio').not().isEmpty(),
  check('password','La contraseña es obligatoria').not().isEmpty(),
  check('email','Porfavor ingresa un correo valido').isEmail(), 
],usersRegister)

router.post('/login', usersLogin)

router.post('/updateCorreo', updateCorreo)

router.post('/insertImg', insertImg)

router.get('/getImg', getImg)

module.exports = router;