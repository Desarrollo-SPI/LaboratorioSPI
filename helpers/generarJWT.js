const JWT = require('jsonwebtoken')

const generarJWT = (id_user = '') => {
    return new Promise((resolve,reject) => {
        const payload = {id_user};
        JWT.sign(payload,process.env.SECRETORPRIVATEKEY,{
            expiresIn: '4h'
        },(err,token)=>{
            if(err){
                console.log('***ERROR',err)
                reject('No se pudo generar el TOKEN')
            } else {
                resolve(token);
            }
        })
    })
}

module.exports = {
    generarJWT
}