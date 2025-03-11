// models/Frequencia.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Turma = require('./turmas');

const Frequencia = sequelize.define(
  'Frequencia',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    dia_da_semana: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    turma: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    horario_inicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    horario_fim: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    assinatura: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'frequencias',
    timestamps: true,
  },
);

// Associação: Cada frequência pertence a uma turma
Frequencia.belongsTo(Turma, { foreignKey: 'turma', as: 'turma_details' });

module.exports = Frequencia;
