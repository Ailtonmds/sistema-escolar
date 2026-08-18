import Turma from '../models/Turma.js';
import Aluno from '../models/Aluno.js'; // Importando o modelo Aluno

async function listarTurmas(req, res) {
  try {
    // Inclui a lista de alunos de cada turma para que possamos saber a quantidade
    const turmas = await Turma.findAll({
      include: [
        {
          model: Aluno,
          as: 'alunos' // Ou apenas model: Aluno se não houver alias configurado
        }
      ]
    });

    return res.status(200).json(turmas);
  } catch (erro) {
    console.error('Erro ao listar turmas:', erro);

    // Fallback: se por algum motivo a associação ainda não estiver definida no Sequelize,
    // busca todas as turmas normalmente
    try {
      const turmasSimples = await Turma.findAll();
      return res.status(200).json(turmasSimples);
    } catch (e) {
      return res.status(500).json({
        message: 'Erro ao listar turmas',
        error: erro.message,
      });
    }
  }
}

async function cadastrarTurma(req, res) {
  try {
    const turma = await Turma.create(req.body);

    console.log('Turma cadastrada:', turma.nome);

    return res.status(201).json(turma);
  } catch (erro) {
    console.error('Erro ao cadastrar turma:', erro);

    return res.status(400).json({
      message: 'Erro ao cadastrar turma',
      error: erro.message,
    });
  }
}

async function atualizarTurma(req, res) {
  try {
    const { id } = req.params;

    const turma = await Turma.findByPk(id);

    if (!turma) {
      return res.status(404).json({
        message: 'Turma não encontrada',
      });
    }

    await turma.update(req.body);

    console.log('Turma atualizada:', turma.nome);

    return res.status(200).json(turma);
  } catch (erro) {
    console.error('Erro ao atualizar turma:', erro);

    return res.status(400).json({
      message: 'Erro ao atualizar turma',
      error: erro.message,
    });
  }
}

async function excluirTurma(req, res) {
  try {
    const { id } = req.params;

    const turma = await Turma.findByPk(id);

    if (!turma) {
      return res.status(404).json({
        message: 'Turma não encontrada',
      });
    }

    await turma.destroy();

    console.log('Turma excluída:', id);

    return res.status(200).json({
      message: 'Turma excluída com sucesso',
    });
  } catch (erro) {
    console.error('Erro ao excluir turma:', erro);

    return res.status(500).json({
      message: 'Erro ao excluir turma',
      error: erro.message,
    });
  }
}

export default {
  listarTurmas,
  cadastrarTurma,
  atualizarTurma,
  excluirTurma,
};