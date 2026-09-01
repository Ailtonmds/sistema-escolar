import Professor from '../models/Professor.js';
import Turma from '../models/Turma.js';
import Disciplina from '../models/Disciplina.js';

async function listarProfessores(req, res) {
  try {
    const professores = await Professor.findAll({
      include: [
        {
          model: Turma,
          as: 'turma',
          attributes: ['id', 'nome']
        },
        {
          model: Disciplina,
          as: 'disciplinas',
          attributes: ['id', 'nome'],
          through: { attributes: [] }
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
    const { nome, email, telefone, turma_id, disciplina_ids } = req.body;

    if (!nome) {
      return res.status(400).json({ message: 'Nome do professor é obrigatório' });
    }

    const professor = await Professor.create({
      nome,
      email: email || null,
      telefone: telefone || null,
      turma_id: turma_id || null
    });

    if (Array.isArray(disciplina_ids) && disciplina_ids.length > 0) {
      await professor.setDisciplinas(disciplina_ids);
    }

    const professorCompleto = await Professor.findByPk(professor.id, {
      include: [
        {
          model: Turma,
          as: 'turma',
          attributes: ['id', 'nome']
        },
        {
          model: Disciplina,
          as: 'disciplinas',
          attributes: ['id', 'nome'],
          through: { attributes: [] }
        }
      ]
    });

    console.log('Professor cadastrado:', professorCompleto.nome);
    return res.status(201).json(professorCompleto);
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

    const { nome, email, telefone, turma_id, disciplina_ids } = req.body;

    await professor.update({
      nome,
      email: email || null,
      telefone: telefone || null,
      turma_id: turma_id || null
    });

    if (Array.isArray(disciplina_ids)) {
      await professor.setDisciplinas(disciplina_ids);
    }

    const professorCompleto = await Professor.findByPk(id, {
      include: [
        {
          model: Turma,
          as: 'turma',
          attributes: ['id', 'nome']
        },
        {
          model: Disciplina,
          as: 'disciplinas',
          attributes: ['id', 'nome'],
          through: { attributes: [] }
        }
      ]
    });

    console.log('Professor atualizado:', professorCompleto.nome);
    return res.status(200).json(professorCompleto);
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
