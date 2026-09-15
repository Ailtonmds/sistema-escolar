import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'sistema-escolar-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '8h';

function gerarToken(usuario) {
  return jwt.sign(
    {
      sub: usuario.id,
      nome: usuario.nome,
      perfil: usuario.perfil
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

function verificarToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (erro) {
    return null;
  }
}

export { gerarToken, verificarToken };