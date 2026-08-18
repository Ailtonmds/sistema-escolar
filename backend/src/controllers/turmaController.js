import Turma from '../models/turmas.js';

async function listarTurmas(req, res) {
  try {
    const turmas = await Turma.findAll();

    res.status(200).json(turmas);
  } catch (erro) {
    console.error(erro);

    res.status(500).send(
      'Erro ao listar turmas: ' + erro.message
    );
  }
}

async function cadastrarTurma(req, res) {
  try {
    const { nome, serie, ano } = req.body;

    if (!nome || !serie || !ano) {
      return res.status(400).send(
        'Nome, série e ano são obrigatórios.'
      );
    }

    const novaTurma = await Turma.create({
      nome,
      serie,
      ano
    });

    res.status(201).json(novaTurma);

  } catch (erro) {
    console.error(erro);

    res.status(500).send(
      'Erro ao cadastrar turma: ' + erro.message
    );
  }
}

async function atualizarTurma(req, res) {
  try {
    const { id, nome, serie, ano } = req.body;
    const turmaExistente = await Turma.findByPk(id);

    if (!turmaExistente) {
      return res.status(404).send("Turma não encontrada");
    }

    const turmaAtualizada = await turmaExistente.update({
      nome,
      serie,
      ano
    });

    res.status(200).json(turmaAtualizada);
  } catch (erro) {
    console.error(erro);

    res.status(500).send(
      'Erro ao atualizar turma: ' + erro.message
    );
  }
}

export default {
  listarTurmas,
  cadastrarTurma,
  atualizarTurma
};