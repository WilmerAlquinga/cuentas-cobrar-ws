'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cobrador extends Model {
    static associate(models) {
      // define association here
    }
  }
  Cobrador.init({
    ID_COBRADOR: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    CEDULA: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    NOMBRE: {
      allowNull: false,
      type: DataTypes.STRING
    },
    DIRECCION: {
      allowNull: false,
      type: DataTypes.STRING
    },
    DIRECCION2: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    tableName: 'COBRADOR',
    modelName: 'Cobrador',
  });
  return Cobrador;
};