import Professor from '../models/Professor.js';
import Turma from '../models/Turma.js';
import Disciplina from '../models/Disciplina.js';
import { sessions } from '../services/sessions.js';

async function autenticar(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Acesso não autorizado. Faça login.' });
  }

  const professorId = sessions.get(token);

  if (!professorId) {
    return res.status(401).json({ message: 'Sessão inválida ou expirada. Faça login novamente.' });
  }

  try {
    const professor = await Professor.findByPk(professorId, {
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
      sessions.delete(token);
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

export { autenticar };