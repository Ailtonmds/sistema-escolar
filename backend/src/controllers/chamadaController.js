import Chamada from '../models/Chamada.js';
import Frequencia from '../models/Frequencia.js';
import { registrarAuditoria } from '../services/auditoria.js';

async function criarChamada(req, res) {
  const professor = req.professor;
  const { turma_id, disciplina_id, data_aula, quantidade_aulas, titulo_plano, faltas } = req.body;

  if (!turma_id || !disciplina_id || !data_aula || !quantidade_aulas) {
    return res.status(400).json({
      message: 'Preencha turma, disciplina, data e quantidade de aulas.'
    });
  }

  if (Number(turma_id) !== Number(professor.turma_id)) {
    return res.status(403).json({
      message: 'Você só pode lançar chamada da sua própria turma.'
    });
  }

  const disciplinasDoProfessor = await professor.getDisciplinas();
  const pertence = disciplinasDoProfessor.some(
    (d) => Number(d.id) === Number(disciplina_id)
  );

  if (!pertence) {
    return res.status(403).json({
      message: 'Você só pode lançar chamada das disciplinas que leciona.'
    });
  }

  const quantidade = Number(quantidade_aulas);

  if (!Number.isInteger(quantidade) || quantidade < 1) {
    return res.status(400).json({ message: 'Quantidade de aulas inválida.' });
  }

  const chamada = await Chamada.create({
    professor_id: professor.id,
    turma_id: Number(turma_id),
    disciplina_id: Number(disciplina_id),
    data_aula,
    quantidade_aulas: quantidade,
    titulo_plano: titulo_plano || null
  });

  let faltasRegistradas = 0;

  if (Array.isArray(faltas) && faltas.length > 0) {
    for (const falta of faltas) {
      if (!falta || !falta.aluno_id || !falta.numero_aula) continue;

      const frequencia = await Frequencia.create({
        aluno_id: falta.aluno_id,
        chamada_id: chamada.id,
        numero_aula: falta.numero_aula,
        data_aula,
        presente: false
      });

      registrarAuditoria({
        usuario_id: professor.id,
        usuario_nome: professor.nome,
        perfil: professor.perfil,
        operacao: 'CRIAR',
        recurso: 'frequencia',
        recurso_id: frequencia.id,
        detalhes: {
          aluno_id: falta.aluno_id,
          chamada_id: chamada.id,
          numero_aula: falta.numero_aula,
          data_aula,
          presente: false,
          disciplina_id: Number(disciplina_id)
        }
      });

      faltasRegistradas += 1;
    }
  }

  registrarAuditoria({
    usuario_id: professor.id,
    usuario_nome: professor.nome,
    perfil: professor.perfil,
    operacao: 'CRIAR',
    recurso: 'chamada',
    recurso_id: chamada.id,
    detalhes: {
      turma_id: Number(turma_id),
      disciplina_id: Number(disciplina_id),
      data_aula,
      quantidade_aulas: quantidade,
      titulo_plano: titulo_plano || null,
      faltas_registradas: faltasRegistradas
    }
  });

  console.log(
    `Chamada salva: professor ${professor.nome}, disciplina ${disciplina_id}, ${quantidade} aula(s)`
  );

  return res.status(201).json({
    chamada,
    faltas_registradas: faltasRegistradas
  });
}

export default { criarChamada };