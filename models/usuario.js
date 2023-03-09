const { DataTypes } = require('sequelize');
const db = require('../db/conection');

const Usuario = db.define('usuario', {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  }

})
  
module.exports = {
  Usuario
};