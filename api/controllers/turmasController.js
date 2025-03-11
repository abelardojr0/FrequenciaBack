const TurmaService = require('../services/turmasService');

exports.create = async (req, res) => {
  try {
    const {
      nome,
      horario_inicio,
      horario_fim,
      total_alunos,
      media_frequencia,
      modulo_atual,
      tipo,
    } = req.body;
    const novaTurma = await TurmaService.createTurma({
      nome,
      horario_inicio,
      horario_fim,
      total_alunos,
      media_frequencia,
      modulo_atual,
      tipo,
    });
    return res.status(201).json(novaTurma);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao cadastrar a turma.' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const turmas = await TurmaService.getTurmas();
    return res.status(200).json(turmas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const turma = await TurmaService.getTurmaById(id);
    if (!turma) {
      return res.status(404).json({ error: 'Turma não encontrada.' });
    }
    return res.status(200).json(turma);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar a turma.' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nome,
      horario_inicio,
      horario_fim,
      total_alunos,
      media_frequencia,
      modulo_atual,
      tipo,
    } = req.body;
    const updatedTurma = await TurmaService.updateTurma(id, {
      nome,
      horario_inicio,
      horario_fim,
      total_alunos,
      media_frequencia,
      modulo_atual,
      tipo,
    });
    return res.status(200).json(updatedTurma);
  } catch (error) {
    console.error(error);
    if (error.message === 'Turma não encontrada.') {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro ao atualizar a turma.' });
  }
};

// Exclusão da turma
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await TurmaService.deleteTurma(id);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    if (error.message === 'Turma not found.') {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro ao deletar a turma.' });
  }
};
