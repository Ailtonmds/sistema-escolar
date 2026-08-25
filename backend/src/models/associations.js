import Aluno from './Aluno.js';
import Turma from './Turma.js';
import Frequencia from './Frequencia.js';

Turma.hasMany(Aluno, {
  as: 'alunos',
  foreignKey: 'turma_id'
});

Aluno.belongsTo(Turma, {
  as: 'turma',
  foreignKey: 'turma_id'
});

Aluno.hasMany(Frequencia, {
  as: 'frequencias',
  foreignKey: 'aluno_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Frequencia.belongsTo(Aluno, {
  as: 'aluno',
  foreignKey: 'aluno_id'
});