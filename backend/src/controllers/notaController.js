import Nota from '../models/Nota.js';
import Aluno from '../models/Aluno.js';

// Listar todas as notas
async function listarNotas(req, res) {
  try {
    const notas = await Nota.findAll();
    return res.status(200).json(notas);
  } catch (erro) {
    console.error('Erro ao listar notas:', erro);
    return res.status(500).json({ message: 'Erro ao listar notas', error: erro.message });
  }
}

// Cadastrar nova nota
async function cadastrarNota(req, res) {
  try {
    const { aluno_id, disciplina, bimestre, nota } = req.body;

    if (!aluno_id || !disciplina || !bimestre || nota === undefined) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const novaNota = await Nota.create({
      aluno_id,
      disciplina,
      bimestre,
      nota: parseFloat(nota)
    });

    return res.status(201).json(novaNota);
  } catch (erro) {
    console.error('Erro ao cadastrar nota:', erro);
    return res.status(400).json({ message: 'Erro ao cadastrar nota', error: erro.message });
  }
}

// Obter Mini Boletim do Aluno (Média, Status e Disciplinas) - Boss Challenge Nível 1, 2 e 4
async function obterBoletimAluno(req, res) {
  try {
    const { aluno_id } = req.params;
    const notas = await Nota.findAll({ where: { aluno_id } });

    if (notas.length === 0) {
      return res.status(200).json({
        aluno_id,
        notas: [],
        media_geral: 0,
        status: 'Sem Notas'
      });
    }

    const soma = notas.reduce((acc, curr) => acc + curr.nota, 0);
    const media_geral = parseFloat((soma / notas.length).toFixed(2));

    // Lógica de Status (Aprovado >= 6.0, Recuperação entre 4.0 e 5.9, Reprovado < 4.0)
    let status = 'Aprovado';
    if (media_geral < 4.0) {
      status = 'Reprovado';
    } else if (media_geral < 6.0) {
      status = 'Recuperação';
    }

    return res.status(200).json({
      aluno_id,
      notas,
      media_geral,
      status
    });
  } catch (erro) {
    console.error('Erro ao obter boletim:', erro);
    return res.status(500).json({ message: 'Erro ao obter boletim', error: erro.message });
  }
}

// Obter Estatísticas Gerais / Turma (Maior nota, Menor nota e Média Geral) - Boss Challenge Nível 3
async function obterEstatisticas(req, res) {
  try {
    const notas = await Nota.findAll();

    if (notas.length === 0) {
      return res.status(200).json({
        maior_nota: 0,
        menor_nota: 0,
        media_turma: 0,
        total_lancamentos: 0
      });
    }

    const valores = notas.map(n => n.nota);
    const maior_nota = Math.max(...valores);
    const menor_nota = Math.min(...valores);
    const soma = valores.reduce((acc, curr) => acc + curr, 0);
    const media_turma = parseFloat((soma / valores.length).toFixed(2));

    return res.status(200).json({
      maior_nota,
      menor_nota,
      media_turma,
      total_lancamentos: notas.length
    });
  } catch (erro) {
    console.error('Erro ao obter estatísticas:', erro);
    return res.status(500).json({ message: 'Erro ao obter estatísticas', error: erro.message });
  }
}

export default {
  listarNotas,
  cadastrarNota,
  obterBoletimAluno,
  obterEstatisticas
};