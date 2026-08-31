import Nota from '../models/Nota.js';
import Aluno from '../models/Aluno.js';
import Disciplina from '../models/Disciplina.js';
import sequelize from '../config/database.js';

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
    const { aluno_id, disciplina_id, disciplina, bimestre, nota } = req.body;
    const disciplinaFinal = disciplina_id || disciplina;

    if (!aluno_id || !disciplinaFinal || !bimestre || nota === undefined) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const novaNota = await Nota.create({
      aluno_id,
      disciplina: disciplinaFinal,
      bimestre: parseInt(bimestre, 10),
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

// Ranking dos alunos por média geral - Boss Challenge Nível 3 / Side Quest 2
async function obterRankingBoletins(req, res) {
  try {
    const { turma_id } = req.query;

    const whereAluno = {};
    if (turma_id) {
      whereAluno.turma_id = turma_id;
    }

    const alunos = await Aluno.findAll({ where: whereAluno });

    const ranking = [];

    for (const aluno of alunos) {
      const notas = await Nota.findAll({ where: { aluno_id: aluno.id } });
      const media = notas.length > 0
        ? parseFloat((notas.reduce((acc, curr) => acc + curr.nota, 0) / notas.length).toFixed(2))
        : 0;
      const status = media >= 6 ? 'Aprovado' : media >= 4 ? 'Recuperação' : 'Reprovado';

      ranking.push({
        aluno_id: aluno.id,
        nome: aluno.nome,
        turma_id: aluno.turma_id,
        total_notas: notas.length,
        media,
        status
      });
    }

    ranking.sort((a, b) => {
      if (b.media !== a.media) return b.media - a.media;
      return a.nome.localeCompare(b.nome);
    });

    ranking.forEach((item, index) => { item.posicao = index + 1; });

    return res.status(200).json(ranking);
  } catch (erro) {
    console.error('Erro ao obter ranking de boletins:', erro);
    return res.status(500).json({ message: 'Erro ao obter ranking de boletins', error: erro.message });
  }
}

// Média por disciplina (geral da escola ou de uma turma via ?turma_id=)
async function obterMediaPorDisciplina(req, res) {
  try {
    const { turma_id } = req.query;

    let whereNota = '1=1';
    const replacements = {};

    if (turma_id) {
      whereNota = 'a.turma_id = :turma_id';
      replacements.turma_id = turma_id;
    }

    const linhas = await sequelize.query(
      `SELECT
          d.id AS disciplina_id,
          d.nome AS disciplina,
          COUNT(n.id) AS total_lancamentos,
          ROUND(AVG(n.nota), 2) AS media
       FROM notas n
       JOIN disciplinas d ON d.id = n.disciplina_id
       JOIN alunos a ON a.id = n.aluno_id
       WHERE ${whereNota}
       GROUP BY d.id, d.nome
       ORDER BY d.nome ASC`,
      {
        replacements,
        type: sequelize.QueryTypes.SELECT
      }
    );

    return res.status(200).json(linhas);
  } catch (erro) {
    console.error('Erro ao obter média por disciplina:', erro);
    return res.status(500).json({ message: 'Erro ao obter média por disciplina', error: erro.message });
  }
}

// Minibolhete por aluno agrupado por disciplina (Boss Challenge Nível 4)
async function obterMiniBoletim(req, res) {
  try {
    const { aluno_id } = req.params;

    const aluno = await Aluno.findByPk(aluno_id);

    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    const notas = await Nota.findAll({
      where: { aluno_id },
      include: [
        {
          model: Disciplina,
          as: 'disciplinaObj',
          attributes: ['id', 'nome']
        }
      ]
    });

    if (notas.length === 0) {
      return res.status(200).json({
        aluno_id,
        aluno_nome: aluno.nome,
        disciplinas: [],
        media_geral: 0,
        status: 'Sem Notas',
        maior_nota: 0,
        menor_nota: 0
      });
    }

    const porDisciplina = {};
    notas.forEach((n) => {
      const nome = n.disciplinaObj ? n.disciplinaObj.nome : `Disciplina ${n.disciplina}`;
      if (!porDisciplina[nome]) porDisciplina[nome] = [];
      porDisciplina[nome].push(n.nota);
    });

    const disciplinas = Object.entries(porDisciplina).map(([nome, valores]) => ({
      disciplina: nome,
      notas: valores.map((v) => Number(v)),
      media: parseFloat((valores.reduce((a, b) => a + b, 0) / valores.length).toFixed(2))
    }));

    const todos = notas.map((n) => n.nota);
    const media_geral = parseFloat((todos.reduce((a, b) => a + b, 0) / todos.length).toFixed(2));
    const maior_nota = Number(Math.max(...todos));
    const menor_nota = Number(Math.min(...todos));

    let status = 'Aprovado';
    if (media_geral < 4.0) status = 'Reprovado';
    else if (media_geral < 6.0) status = 'Recuperação';

    return res.status(200).json({
      aluno_id,
      aluno_nome: aluno.nome,
      disciplinas,
      media_geral,
      status,
      maior_nota,
      menor_nota
    });
  } catch (erro) {
    console.error('Erro ao obter mini boletim:', erro);
    return res.status(500).json({ message: 'Erro ao obter mini boletim', error: erro.message });
  }
}

export default {
  listarNotas,
  cadastrarNota,
  obterBoletimAluno,
  obterEstatisticas,
  obterRankingBoletins,
  obterMediaPorDisciplina,
  obterMiniBoletim
};