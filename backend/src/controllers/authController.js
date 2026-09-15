import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import Professor from '../models/Professor.js';
import Turma from '../models/Turma.js';
import Disciplina from '../models/Disciplina.js';
import { gerarToken } from '../services/auth.js';
import { registrarAuditoria } from '../services/auditoria.js';

async function login(req, res) {
  const { usuario, email, senha } = req.body;
  const identificador = (email || usuario || '').trim();

  if (!identificador || !senha) {
    return res.status(400).json({ message: 'Informe e-mail e senha.' });
  }

  const professor = await Professor.unscoped().findOne({
    where: {
      [Op.or]: [{ usuario: identificador }, { email: identificador }]
    },
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

  const senhaValida = await compararSenha(professor, senha);

  if (!professor || !senhaValida) {
    registrarAuditoria({
      usuario_nome: identificador,
      operacao: 'LOGIN_FALHA',
      recurso: 'login',
      detalhes: { identificador, motivo: senhaValida === null ? 'usuario_inexistente' : 'senha_incorreta' }
    });
    return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
  }

  await migrarSenhaSeNecessario(professor, senha);

  const token = gerarToken(professor);

  registrarAuditoria({
    usuario_id: professor.id,
    usuario_nome: professor.nome,
    perfil: professor.perfil,
    operacao: 'LOGIN_SUCESSO',
    recurso: 'login',
    recurso_id: professor.id
  });

  const dados = { ...professor.toJSON() };
  delete dados.senha;

  console.log(`Login realizado: ${professor.nome}`);
  return res.status(200).json({ token, professor: dados });
}

// Retorna true/false para senha aceita/rejeitada e null quando o professor não existe.
async function compararSenha(professor, senha) {
  if (!professor) return null;
  if (!professor.senha) return null;

  const hash = String(professor.senha);

  if (hash.startsWith('$2')) {
    return bcrypt.compare(senha, hash);
  }

  return hash === senha;
}

// Converte senhas em texto puro para hash bcrypt na primeira vez que o login é feito.
async function migrarSenhaSeNecessario(professor, senha) {
  const hash = String(professor.senha || '');
  if (!hash.startsWith('$2') && hash === senha) {
    const salt = await bcrypt.genSalt(10);
    professor.senha = await bcrypt.hash(senha, salt);
    await professor.save();
    console.log(`Senha do professor "${professor.nome}" migrada para hash bcrypt.`);
  }
}

function me(req, res) {
  return res.status(200).json({ professor: req.professor });
}

export default { login, me };