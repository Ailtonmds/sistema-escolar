import Professor from '../models/Professor.js';
import Turma from '../models/Turma.js';

async function listarProfessores(req, res) {
  try {
    const professores = await Professor.findAll({
      include: [
        {
          model: Turma,
          as: 'turma',
          attributes: ['id', 'nome']
        }
      ],
      order: [['nome', 'ASC']]
    });
    return res.status(200).json(professores);
  } catch (erro) {
    console.error('Erro ao listar professores:', erro);
    return res.status(500).json({ message: 'Erro ao listar professores', error: erro.message });
  }
}

async function cadastrarProfessor(req, res) {
  try {
    const { nome, email, telefone, disciplina, turma_id } = req.body;

    if (!nome) {
      return res.status(400).json({ message: 'Nome do professor é obrigatório' });
    }

    const professor = await Professor.create({
      nome,
      email: email || null,
      telefone: telefone || null,
      disciplina: disciplina || null,
      turma_id: turma_id || null
    });

    console.log('Professor cadastrado:', professor.nome);
    return res.status(201).json(professor);
  } catch (erro) {
    console.error('Erro ao cadastrar professor:', erro);
    const status = erro.name === 'SequelizeUniqueConstraintError' ? 409 : 400;
    return res.status(status).json({ message: 'Erro ao cadastrar professor', error: erro.message });
  }
}

async function atualizarProfessor(req, res) {
  try {
    const { id } = req.params;
    const professor = await Professor.findByPk(id);

    if (!professor) {
      return res.status(404).json({ message: 'Professor não encontrado' });
    }

    await professor.update(req.body);
    console.log('Professor atualizado:', professor.nome);
    return res.status(200).json(professor);
  } catch (erro) {
    console.error('Erro ao atualizar professor:', erro);
    const status = erro.name === 'SequelizeUniqueConstraintError' ? 409 : 400;
    return res.status(status).json({ message: 'Erro ao atualizar professor', error: erro.message });
  }
}

async function excluirProfessor(req, res) {
  try {
    const { id } = req.params;
    const professor = await Professor.findByPk(id);

    if (!professor) {
      return res.status(404).json({ message: 'Professor não encontrado' });
    }

    await professor.destroy();
    console.log('Professor excluído:', id);
    return res.status(200).json({ message: 'Professor excluído com sucesso' });
  } catch (erro) {
    console.error('Erro ao excluir professor:', erro);
    return res.status(500).json({ message: 'Erro ao excluir professor', error: erro.message });
  }
}

export default {
  listarProfessores,
  cadastrarProfessor,
  atualizarProfessor,
  excluirProfessor
};
