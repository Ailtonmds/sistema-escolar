import Turma from '../models/Turma.js';

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

export default {
  listarTurmas,
  cadastrarTurma
};