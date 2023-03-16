const { Router } = require('express');
const { check } = require('express-validator');
const {validaciones,validarJWT} = require('../middlewares')
const { emailExiste, usuarioExiste, } = require('../helpers/funcionesUtiles');
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

router.post('/login',[
  check('user_name','El nombre de usuario es obligatorio').not().isEmpty(), 
  check('password','La contraseña es obligatoria').not().isEmpty(),
  validaciones
],usersLogin)

router.post('/registro',[
  check('user_name').custom(usuarioExiste),
  check('password','La contraseña es obligatoria').not().isEmpty(),
  check('email','Porfavor ingresa un correo valido').isEmail(),  
  check('email').custom(emailExiste),  
  validaciones
],usersRegister)

router.post('/updateCorreo',[
  validarJWT,
  check('email','Porfavor ingresa un correo valido').isEmail(),
  check('email').custom(emailExiste),
  validaciones
],updateCorreo)

router.post('/insertImg',[
  check('','La contraseña es obligatoria').not().isEmpty(),
], insertImg)

router.get('/getImg', getImg)

module.exports = router;