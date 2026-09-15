import { Op } from 'sequelize';
import Auditoria from '../models/Auditoria.js';

async function listarAuditoria(req, res) {
  try {
    const { usuario, operacao, recurso, inicio, fim, limite } = req.query;

    const where = {};

    if (usuario) {
      where.usuario_nome = { [Op.like]: `%${usuario}%` };
    }

    if (operacao) {
      where.operacao = operacao;
    }

    if (recurso) {
      where.recurso = recurso;
    }

    if (inicio || fim) {
      where.criado_em = {};
      if (inicio) where.criado_em[Op.gte] = new Date(inicio);
      if (fim) where.criado_em[Op.lte] = new Date(fim);
    }

    const registros = await Auditoria.findAll({
      where,
      order: [['criado_em', 'DESC']],
      limit: limite ? Math.min(Number(limite) || 200, 1000) : 500
    });

    return res.status(200).json(registros);
  } catch (erro) {
    console.error('Erro ao listar auditoria:', erro);
    return res.status(500).json({ message: 'Erro ao listar auditoria', error: erro.message });
  }
}

// Indicadores para o painel de auditoria (Boss Challenge).
async function obterIndicadores(req, res) {
  try {
    const agora = new Date();
    const inicio24h = new Date(agora.getTime() - 24 * 60 * 60 * 1000);

    const [totalEventos, eventosPorOperacao, loginsRecusados24h, ultimosAcessos] = await Promise.all([
      Auditoria.count(),
      Auditoria.findAll({
        attributes: [
          'operacao',
          [Auditoria.sequelize.fn('COUNT', Auditoria.sequelize.col('id')), 'total']
        ],
        group: ['operacao'],
        raw: true
      }),
      Auditoria.count({
        where: {
          operacao: 'LOGIN_FALHA',
          criado_em: { [Op.gte]: inicio24h }
        }
      }),
      Auditoria.findAll({
        attributes: [
          'usuario_nome',
          'perfil',
          [Auditoria.sequelize.fn('MAX', Auditoria.sequelize.col('criado_em')), 'ultimo_acesso']
        ],
        where: { operacao: 'LOGIN_SUCESSO' },
        group: ['usuario_nome', 'perfil'],
        order: [[Auditoria.sequelize.fn('MAX', Auditoria.sequelize.col('criado_em')), 'DESC']],
        raw: true
      })
    ]);

    const tentativasRecusadas = await Auditoria.findAll({
      attributes: [
        'usuario_nome',
        [Auditoria.sequelize.fn('COUNT', Auditoria.sequelize.col('id')), 'tentativas']
      ],
      where: {
        operacao: 'LOGIN_FALHA',
        criado_em: { [Op.gte]: inicio24h }
      },
      group: ['usuario_nome'],
      having: Auditoria.sequelize.literal('COUNT(id) >= 3'),
      raw: true
    });

    return res.status(200).json({
      total_eventos: totalEventos,
      eventos_por_operacao: eventosPorOperacao,
      logins_recusados_24h: loginsRecusados24h,
      ultimos_acessos: ultimosAcessos,
      alerta_tentativas: tentativasRecusadas
    });
  } catch (erro) {
    console.error('Erro ao obter indicadores de auditoria:', erro);
    return res.status(500).json({ message: 'Erro ao obter indicadores de auditoria', error: erro.message });
  }
}

export default { listarAuditoria, obterIndicadores };