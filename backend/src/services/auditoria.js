import Auditoria from '../models/Auditoria.js';

// Registra um evento de auditoria sem interromper a operação principal.
// Qualquer falha no registro é silenciada para nunca quebrar o fluxo principal.
function registrarAuditoria({
  usuario_id = null,
  usuario_nome = 'Sistema',
  perfil = null,
  operacao,
  recurso,
  recurso_id = null,
  detalhes = null
}) {
  const dados = {
    usuario_id,
    usuario_nome: usuario_nome || 'Sistema',
    perfil: perfil || null,
    operacao,
    recurso,
    recurso_id: recurso_id != null ? recurso_id : null,
    detalhes: detalhes ? JSON.stringify(detalhes) : null
  };

  Auditoria.create(dados)
    .then(() => {})
    .catch((erro) => {
      console.error('Falha ao registrar auditoria (não interrompe a operação):', erro.message);
    });
}

export { registrarAuditoria };