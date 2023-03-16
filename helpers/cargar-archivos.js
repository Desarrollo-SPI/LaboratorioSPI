const path = require('path');

const cargarArchivos = (files,extensionesValidas=['png', 'jpg', 'jpeg'], carpeta='') => {

  return new Promise((resolve, reject) => {
    const { archivo } = files;
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];

    //Validar la extension
    if (!extensionesValidas.includes(extension)) {
      return reject(`El tipo de archivo ${extension} no es valido, solo se aceptan: ${extensionesValidas}`)
    }

    // const uploadPath = path.join('/var/www/html/api/laboratorioSPI/img/',archivo.name);
    const uploadPath = path.join(__dirname, '../img/',carpeta,archivo.name);
    archivo.mv(uploadPath, (err) => {
      if (err) {
        return reject('Error desconocido, contacte con la secretaria de planeacion e informatica: ',err);
      }

      resolve(uploadPath)

    });

  })

}

module.exports = {
  cargarArchivos
}