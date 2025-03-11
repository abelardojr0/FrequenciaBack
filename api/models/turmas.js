const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Turma = sequelize.define(
  'Turma',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
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
    total_alunos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    media_frequencia: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    modulo_atual: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
  },
  {
    tableName: 'turmas',
    timestamps: true,
  },
);

module.exports = Turma;
