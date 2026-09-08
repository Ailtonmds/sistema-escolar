import crypto from 'crypto';
import Professor from '../models/Professor.js';
import Turma from '../models/Turma.js';
import Disciplina from '../models/Disciplina.js';
import { sessions } from '../services/sessions.js';

async function login(req, res) {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ message: 'Informe usuário e senha.' });
  }

  const professor = await Professor.unscoped().findOne({
    where: { usuario },
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

  if (!professor || professor.senha !== senha) {
    return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
  }

  const token = crypto.randomBytes(24).toString('hex');
  sessions.set(token, professor.id);

  const dados = { ...professor.toJSON() };
  delete dados.senha;

  console.log(`Login realizado: ${professor.nome}`);
  return res.status(200).json({ token, professor: dados });
}

function me(req, res) {
  return res.status(200).json({ professor: req.professor });
}

export default { login, me };