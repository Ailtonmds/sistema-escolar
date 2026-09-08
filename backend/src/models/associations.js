import Aluno from './Aluno.js';
import Turma from './Turma.js';
import Nota from './Nota.js';
import Chamada from './Chamada.js';
import Frequencia from './Frequencia.js';
import Disciplina from './Disciplina.js';
import Professor from './Professor.js';
import ProfessorDisciplina from './ProfessorDisciplina.js';

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

Professor.belongsToMany(Disciplina, {
  as: 'disciplinas',
  through: ProfessorDisciplina,
  foreignKey: 'professor_id',
  otherKey: 'disciplina_id'
});

Disciplina.belongsToMany(Professor, {
  as: 'professores',
  through: ProfessorDisciplina,
  foreignKey: 'disciplina_id',
  otherKey: 'professor_id'
});

Professor.hasMany(Chamada, {
  as: 'chamadas',
  foreignKey: 'professor_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Chamada.belongsTo(Professor, {
  as: 'professor',
  foreignKey: 'professor_id'
});

Turma.hasMany(Chamada, {
  as: 'chamadas',
  foreignKey: 'turma_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Chamada.belongsTo(Turma, {
  as: 'turma',
  foreignKey: 'turma_id'
});

Disciplina.hasMany(Chamada, {
  as: 'chamadas',
  foreignKey: 'disciplina_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Chamada.belongsTo(Disciplina, {
  as: 'disciplinaObj',
  foreignKey: 'disciplina_id'
});

Chamada.hasMany(Frequencia, {
  as: 'frequencias',
  foreignKey: 'chamada_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Frequencia.belongsTo(Chamada, {
  as: 'chamada',
  foreignKey: 'chamada_id'
});