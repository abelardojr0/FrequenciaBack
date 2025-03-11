const Turma = require('../models/turmas');

// Cria uma nova turma
async function createTurma(data) {
  const turma = await Turma.create(data);
  return turma;
}

// Retorna todas as turmas
async function getTurmas() {
  const turmas = await Turma.findAll();
  return turmas;
}

// Retorna uma turma por ID
async function getTurmaById(id) {
  const turma = await Turma.findByPk(id);
  return turma;
}

// Atualiza a turma com base no ID
async function updateTurma(id, data) {
  const turma = await Turma.findByPk(id);
  if (!turma) {
    throw new Error('Turma not found.');
  }
  const updatedTurma = await turma.update(data);
  return updatedTurma;
}

// Exclui a turma com base no ID
async function deleteTurma(id) {
  const turma = await Turma.findByPk(id);
  if (!turma) {
    throw new Error('Turma not found.');
  }
  await turma.destroy();
  return true;
}

module.exports = {
  createTurma,
  getTurmas,
  getTurmaById,
  updateTurma,
  deleteTurma,
};
