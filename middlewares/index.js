
const validaciones = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');

module.exports = {
    ...validaciones,
    ...validarJWT,
}