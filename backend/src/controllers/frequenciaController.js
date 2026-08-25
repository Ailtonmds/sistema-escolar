import { Op } from 'sequelize';
import Frequencia from '../models/Frequencia.js';
import Aluno from '../models/Aluno.js';

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

export default {
  listarFrequencias,
  adicionarFrequencia,
  obterFrequenciasAluno,
  obterEstatisticas
};