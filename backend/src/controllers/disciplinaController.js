import Disciplina from '../models/Disciplina.js';

async function listarDisciplinas(req, res) {
  try {
    const disciplinas = await Disciplina.findAll({ order: [['nome', 'ASC']] });
    return res.status(200).json(disciplinas);
  } catch (erro) {
    console.error('Erro ao listar disciplinas:', erro);
    return res.status(500).json({ message: 'Erro ao listar disciplinas', error: erro.message });
  }
}

async function cadastrarDisciplina(req, res) {
  try {
    const { nome, descricao } = req.body;

    if (!nome) {
      return res.status(400).json({ message: 'Nome da disciplina é obrigatório' });
    }

    const existente = await Disciplina.findOne({ where: { nome } });
    if (existente) {
      return res.status(409).json({ message: 'Já existe uma disciplina com este nome' });
    }

    const disciplina = await Disciplina.create({ nome, descricao: descricao || null });
    console.log('Disciplina cadastrada:', disciplina.nome);
    return res.status(201).json(disciplina);
  } catch (erro) {
    console.error('Erro ao cadastrar disciplina:', erro);
    return res.status(400).json({ message: 'Erro ao cadastrar disciplina', error: erro.message });
  }
}

async function atualizarDisciplina(req, res) {
  try {
    const { id } = req.params;
    const disciplina = await Disciplina.findByPk(id);

    if (!disciplina) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }

    const { nome, descricao } = req.body;
    if (nome && nome !== disciplina.nome) {
      const existente = await Disciplina.findOne({ where: { nome } });
      if (existente) {
        return res.status(409).json({ message: 'Já existe uma disciplina com este nome' });
      }
    }

    await disciplina.update({ nome, descricao });
    console.log('Disciplina atualizada:', disciplina.nome);
    return res.status(200).json(disciplina);
  } catch (erro) {
    console.error('Erro ao atualizar disciplina:', erro);
    return res.status(400).json({ message: 'Erro ao atualizar disciplina', error: erro.message });
  }
}

async function excluirDisciplina(req, res) {
  try {
    const { id } = req.params;
    const disciplina = await Disciplina.findByPk(id);

    if (!disciplina) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }

    await disciplina.destroy();
    console.log('Disciplina excluída:', id);
    return res.status(200).json({ message: 'Disciplina excluída com sucesso' });
  } catch (erro) {
    console.error('Erro ao excluir disciplina:', erro);
    return res.status(500).json({ message: 'Erro ao excluir disciplina', error: erro.message });
  }
}

export default {
  listarDisciplinas,
  cadastrarDisciplina,
  atualizarDisciplina,
  excluirDisciplina,
};
