import Aluno from '../models/Aluno.js';

async function listarAlunos(req, res) {
  try {
    const alunos = await Aluno.findAll();

    res.status(200).json(alunos);
  } catch (erro) {
    console.error('Erro ao listar alunos:', erro);

    res.status(500).json({
      message: 'Erro ao listar alunos',
      error: erro.message,
    });
  }
}

async function cadastrarAluno(req, res) {
  try {
    const aluno = await Aluno.create(req.body);

    console.log('Aluno cadastrado:', aluno.nome);

    res.status(201).json(aluno);
  } catch (erro) {
    console.error('Erro ao cadastrar aluno:', erro);

    res.status(400).json({
      message: 'Erro ao cadastrar aluno',
      error: erro.message,
    });
  }
}

async function atualizarAluno(req, res) {
  try {
    const { id } = req.params;

    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      return res.status(404).json({
        message: 'Aluno não encontrado',
      });
    }

    await aluno.update(req.body);

    console.log('Aluno atualizado:', aluno.nome);

    return res.status(200).json(aluno);
  } catch (erro) {
    console.error('Erro ao atualizar aluno:', erro);

    return res.status(400).json({
      message: 'Erro ao atualizar aluno',
      error: erro.message,
    });
  }
}

async function excluirAluno(req, res) {
  try {
    const { id } = req.params;

    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      return res.status(404).json({
        message: 'Aluno não encontrado',
      });
    }

    await aluno.destroy();

    console.log('Aluno excluído:', id);

    return res.status(200).json({
      message: 'Aluno excluído com sucesso',
    });
  } catch (erro) {
    console.error('Erro ao excluir aluno:', erro);

    return res.status(500).json({
      message: 'Erro ao excluir aluno',
      error: erro.message,
    });
  }
}

export default {
  listarAlunos,
  cadastrarAluno,
  atualizarAluno,
  excluirAluno,
};