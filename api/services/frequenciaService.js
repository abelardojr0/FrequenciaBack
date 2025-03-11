const Frequencia = require('../models/frequencia');
const Turma = require('../models/turmas');
const { Op } = require('sequelize');

// Função auxiliar para calcular o período baseado em year e mês
function calcularPeriodoMes(year, mouth) {
  let startDate, endDate;
  if (mouth === 1) {
    // Para janeiro, o período é de 21 de dezembro do year anterior até 20 de janeiro
    startDate = new Date(year - 1, 11, 21); // dezembro (mês 11)
    endDate = new Date(year, 0, 20); // janeiro (mês 0)
  } else {
    // Para outros meses, por exemplo, para março (mouth=3):
    // Período: 21 de fevereiro (mouth-2) até 20 de março (mouth-1)
    startDate = new Date(year, mouth - 2, 21);
    endDate = new Date(year, mouth - 1, 20);
  }
  return { startDate, endDate };
}

async function getFrequencias(filters = {}) {
  const where = {};

  // Filtro por data customizada
  if (filters.startDate && filters.endDate) {
    where.data = {
      [Op.between]: [new Date(filters.startDate), new Date(filters.endDate)],
    };
  } else if (filters.year && filters.mouth) {
    // Aplica a lógica: de 21 do mês anterior até 20 do mês informado
    const { startDate, endDate } = calcularPeriodoMes(
      Number(filters.year),
      Number(filters.mouth),
    );
    where.data = {
      [Op.between]: [startDate, endDate],
    };
  } else if (filters.year) {
    const startDate = new Date(Number(filters.year), 0, 1);
    const endDate = new Date(Number(filters.year), 11, 31);
    where.data = {
      [Op.between]: [startDate, endDate],
    };
  }

  // Filtro para busca textual (ajuste conforme o banco de dados utilizado)
  if (filters.search) {
    where[Op.or] = [
      { turma: { [Op.iLike]: `%${filters.search}%` } },
      { data: { [Op.iLike]: `%${filters.search}%` } },
    ];
  }

  const frequencias = await Frequencia.findAll({
    where,
    include: [
      {
        model: Turma,
        as: 'turma_details',
        attributes: ['id', 'nome', 'tipo', 'modulo_atual'],
      },
    ],
  });
  return frequencias;
}

// Retorna uma frequência por ID
async function getFrequenciaById(id) {
  const frequencia = await Frequencia.findByPk(id);
  return frequencia;
}

// Cria uma nova frequência
async function createFrequencia(data) {
  // Aqui podem ser inseridas validações e regras de negócio
  const frequencia = await Frequencia.create(data);
  return frequencia;
}

// Atualiza a frequência com base no ID
async function updateFrequencia(id, data) {
  const frequencia = await Frequencia.findByPk(id);
  if (!frequencia) {
    throw new Error('Frequência não encontrada.');
  }
  const updatedFrequencia = await frequencia.update(data);
  return updatedFrequencia;
}

// Exclui a frequência com base no ID
async function deleteFrequencia(id) {
  const frequencia = await Frequencia.findByPk(id);
  if (!frequencia) {
    throw new Error('Frequência não encontrada.');
  }
  await frequencia.destroy();
  return true;
}

module.exports = {
  createFrequencia,
  getFrequencias,
  getFrequenciaById,
  updateFrequencia,
  deleteFrequencia,
};
