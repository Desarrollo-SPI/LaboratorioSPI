const { Router } = require('express');
const {
  usersRegister,
  usersGet,
  usersLogin,
  updateCorreo,
} = require('../controllers/userController');

const { insertImg, getImg,} = require('../controllers/imgControllers');

const router = Router();

router.get('/getUser', usersGet)
router.post('/registro', usersRegister)
router.post('/login', usersLogin)
router.post('/updateCorreo', updateCorreo)
router.post('/insertImg', insertImg)
router.get('/getImg', getImg)

module.exports = router;