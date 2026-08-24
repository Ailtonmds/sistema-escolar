import Aluno from './Aluno.js';
import Turma from './Turma.js';

Turma.hasMany(Aluno, {
  as: 'alunos',
  foreignKey: 'turma_id',
});

Aluno.belongsTo(Turma, {
  as: 'turma',
  foreignKey: 'turma_id',
});
