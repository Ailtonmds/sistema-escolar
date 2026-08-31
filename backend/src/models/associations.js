import Aluno from './Aluno.js';
import Turma from './Turma.js';
import Nota from './Nota.js';
import Frequencia from './Frequencia.js';
import Disciplina from './Disciplina.js';
import Professor from './Professor.js';

Turma.hasMany(Professor, {
  as: 'professores',
  foreignKey: 'turma_id'
});

Turma.hasMany(Aluno, {
  as: 'alunos',
  foreignKey: 'turma_id'
});

Aluno.belongsTo(Turma, {
  as: 'turma',
  foreignKey: 'turma_id'
});

Aluno.hasMany(Nota, {
  as: 'notas',
  foreignKey: 'aluno_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Nota.belongsTo(Aluno, {
  as: 'aluno',
  foreignKey: 'aluno_id'
});

Disciplina.hasMany(Nota, {
  as: 'notas',
  foreignKey: 'disciplina_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Nota.belongsTo(Disciplina, {
  as: 'disciplinaObj',
  foreignKey: 'disciplina_id'
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

Professor.belongsTo(Turma, {
  as: 'turma',
  foreignKey: 'turma_id'
});