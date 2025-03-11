const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email_confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    assinatura: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    valor_hora_aula: {
      type: DataTypes.NUMERIC(10, 2),
      allowNull: true,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
  },
);

module.exports = User;
