const FrequenciaService = require('../services/frequenciaService');

// Criação de uma nova frequência
exports.create = async (req, res) => {
  try {
    const {
      data,
      dia_da_semana,
      turma,
      horario_inicio,
      horario_fim,
      assinatura,
    } = req.body;
    const novaFrequencia = await FrequenciaService.createFrequencia({
      data,
      dia_da_semana,
      turma,
      horario_inicio,
      horario_fim,
      assinatura,
    });
    return res.status(201).json(novaFrequencia);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Listagem de todas as frequências com filtros

exports.getAll = async (req, res) => {
  try {
    // Obtém os filtros via query string: ano, mes, startDate, endDate e search
    const { ano, mes, startDate, endDate, search } = req.query;
    const filters = {};

    // Se informados data de início e fim, usa esses filtros
    if (startDate && endDate) {
      filters.startDate = startDate;
      filters.endDate = endDate;
    } else if (ano && mes) {
      // Se ano e mês forem informados, aplica a regra:
      // Do dia 21 do mês anterior até dia 20 do mês informado.
      filters.ano = ano;
      filters.mes = mes;
    } else if (ano) {
      // Filtra por ano inteiro
      filters.ano = ano;
    }
    // Se houver busca textual
    if (search) {
      filters.search = search;
    }

    const frequencias = await FrequenciaService.getFrequencias(filters);
    return res.status(200).json(frequencias);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar as frequências.' });
  }
};

// Busca de uma frequência por ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const frequencia = await FrequenciaService.getFrequenciaById(id);
    if (!frequencia) {
      return res.status(404).json({ error: 'Frequência não encontrada.' });
    }
    return res.status(200).json(frequencia);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar a frequência.' });
  }
};

// Atualização da frequência
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      data,
      dia_da_semana,
      turma,
      horario_inicio,
      horario_fim,
      assinatura,
    } = req.body;
    const updatedFrequencia = await FrequenciaService.updateFrequencia(id, {
      data,
      dia_da_semana,
      turma,
      horario_inicio,
      horario_fim,
      assinatura,
    });
    return res.status(200).json(updatedFrequencia);
  } catch (error) {
    console.error(error);
    if (error.message === 'Frequência não encontrada.') {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro ao atualizar a frequência.' });
  }
};

// Exclusão da frequência
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await FrequenciaService.deleteFrequencia(id);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    if (error.message === 'Frequência não encontrada.') {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro ao deletar a frequência.' });
  }
};
