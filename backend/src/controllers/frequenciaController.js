import { Op } from 'sequelize';
import Frequencia from '../models/Frequencia.js';
import Aluno from '../models/Aluno.js';
import Turma from '../models/Turma.js';

function classificarFrequencia(percentual) {
  if (percentual >= 75) return { nivel: 'Boa', cor: '#10b981', rotulo: 'Frequência Boa' };
  if (percentual >= 60) return { nivel: 'Atenção', cor: '#f59e0b', rotulo: 'Atenção' };
  return { nivel: 'Risco', cor: '#ef4444', rotulo: 'Risco de Reprovação' };
}

async function listarFrequencias(req, res) {
  try {
    const { aluno_id, data } = req.query;

    const where = {};

    if (aluno_id) {
      where.aluno_id = aluno_id;
    }

    if (data) {
      where.data_aula = data;
    }

    const frequencias = await Frequencia.findAll({
      where,
      include: [
        {
          model: Aluno,
          as: 'aluno',
          attributes: ['id', 'nome']
        }
      ],
      order: [['data_aula', 'DESC']]
    });

    return res.status(200).json(frequencias);
  } catch (erro) {
    console.error('Erro ao listar frequências:', erro);

    return res.status(500).json({
      message: 'Erro ao listar frequências',
      error: erro.message
    });
  }
}

async function adicionarFrequencia(req, res) {
  try {
    const { aluno_id, data_aula, presente } = req.body;

    if (!aluno_id || !data_aula || typeof presente !== 'boolean') {
      return res.status(400).json({
        message: 'aluno_id, data_aula e presente são obrigatórios'
      });
    }

    const aluno = await Aluno.findByPk(aluno_id);

    if (!aluno) {
      return res.status(404).json({
        message: 'Aluno não encontrado'
      });
    }

    const frequenciaExistente = await Frequencia.findOne({
      where: {
        aluno_id,
        data_aula
      }
    });

    if (frequenciaExistente) {
      return res.status(409).json({
        message: 'Já existe uma frequência registrada para este aluno nesta data'
      });
    }

    const frequencia = await Frequencia.create({
      aluno_id,
      data_aula,
      presente
    });

    const resultado = await Frequencia.findByPk(frequencia.id, {
      include: [
        {
          model: Aluno,
          as: 'aluno',
          attributes: ['id', 'nome']
        }
      ]
    });

    return res.status(201).json(resultado);
  } catch (erro) {
    console.error('Erro ao adicionar frequência:', erro);

    return res.status(400).json({
      message: 'Erro ao adicionar frequência',
      error: erro.message
    });
  }
}

async function obterFrequenciasAluno(req, res) {
  try {
    const { aluno_id } = req.params;

    const aluno = await Aluno.findByPk(aluno_id);

    if (!aluno) {
      return res.status(404).json({
        message: 'Aluno não encontrado'
      });
    }

    const frequencias = await Frequencia.findAll({
      where: {
        aluno_id
      },
      order: [['data_aula', 'DESC']]
    });

    const presencas = frequencias.filter(
      frequencia => frequencia.presente === true
    ).length;

    const faltas = frequencias.filter(
      frequencia => frequencia.presente === false
    ).length;

    return res.status(200).json({
      aluno: {
        id: aluno.id,
        nome: aluno.nome
      },
      total: frequencias.length,
      presencas,
      faltas,
      frequencias
    });
  } catch (erro) {
    console.error('Erro ao consultar frequência:', erro);

    return res.status(500).json({
      message: 'Erro ao consultar frequência',
      error: erro.message
    });
  }
}

async function obterEstatisticas(req, res) {
  try {
    const totalPresencas = await Frequencia.count({
      where: {
        presente: true
      }
    });

    const totalFaltas = await Frequencia.count({
      where: {
        presente: false
      }
    });

    const totalRegistros = await Frequencia.count();

    return res.status(200).json({
      total: totalRegistros,
      presencas: totalPresencas,
      faltas: totalFaltas
    });
  } catch (erro) {
    console.error('Erro ao obter estatísticas:', erro);

    return res.status(500).json({
      message: 'Erro ao obter estatísticas',
      error: erro.message
    });
  }
}

// Resumo de frequência: % por aluno, classificação, alunos em risco e ranking.
// Filtro opcional por turma: ?turma_id=1
async function obterResumoFrequencias(req, res) {
  try {
    const { turma_id } = req.query;

    const whereAluno = {};
    if (turma_id) {
      whereAluno.turma_id = turma_id;
    }

    const alunos = await Aluno.findAll({
      where: whereAluno,
      include: [
        {
          model: Frequencia,
          as: 'frequencias',
          attributes: ['presente']
        },
        {
          model: Turma,
          as: 'turma',
          attributes: ['id', 'nome']
        }
      ]
    });

    const resumo = alunos.map((aluno) => {
      const registros = aluno.frequencias || [];
      const total = registros.length;
      const presencas = registros.filter((r) => r.presente === true).length;
      const faltas = total - presencas;
      const percentual = total > 0 ? parseFloat(((presencas / total) * 100).toFixed(1)) : 0;
      const classificacao = classificarFrequencia(percentual);

      return {
        aluno_id: aluno.id,
        nome: aluno.nome,
        turma: aluno.turma ? aluno.turma.nome : null,
        total_aulas: total,
        presencas,
        faltas,
        percentual,
        classificacao
      };
    });

    const emRisco = resumo.filter((r) => r.percentual < 75);

    const ranking = [...resumo].sort((a, b) => b.percentual - a.percentual);

    return res.status(200).json({
      resumo,
      emRisco,
      ranking,
      total_alunos: resumo.length,
      alunos_em_risco: emRisco.length
    });
  } catch (erro) {
    console.error('Erro ao obter resumo de frequência:', erro);

    return res.status(500).json({
      message: 'Erro ao obter resumo de frequência',
      error: erro.message
    });
  }
}

export default {
  listarFrequencias,
  adicionarFrequencia,
  obterFrequenciasAluno,
  obterEstatisticas,
  obterResumoFrequencias
};