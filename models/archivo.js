const { DataTypes } = require('sequelize');
const db = require('../db/conection');

const Archivo = db.define('archivo', {
  fileId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = {
  Archivo
}
