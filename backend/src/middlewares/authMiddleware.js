import Professor from '../models/Professor.js';
import Turma from '../models/Turma.js';
import Disciplina from '../models/Disciplina.js';
import { verificarToken } from '../services/auth.js';

async function autenticar(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Acesso não autorizado. Faça login.' });
  }

  const payload = verificarToken(token);

  if (!payload || !payload.sub) {
    return res.status(401).json({ message: 'Token inválido ou expirado. Faça login novamente.' });
  }

  try {
    const professor = await Professor.findByPk(payload.sub, {
      include: [
        {
          model: Turma,
          as: 'turma',
          attributes: ['id', 'nome', 'serie', 'ano']
        },
        {
          model: Disciplina,
          as: 'disciplinas',
          attributes: ['id', 'nome'],
          through: { attributes: [] }
        }
      ]
    });

    if (!professor) {
      return res.status(401).json({ message: 'Professor não encontrado. Faça login novamente.' });
    }

    req.professor = professor;
    req.token = token;
    return next();
  } catch (erro) {
    console.error('Erro ao autenticar:', erro);
    return res.status(500).json({ message: 'Erro ao autenticar', error: erro.message });
  }
}

async function exigirAdmin(req, res, next) {
  if (req.professor && req.professor.perfil === 'admin') {
    return next();
  }
  return res.status(403).json({
    message: 'Acesso negado. Somente o perfil administrador pode executar esta ação.'
  });
}

export { autenticar, exigirAdmin };