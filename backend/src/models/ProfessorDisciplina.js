import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class ProfessorDisciplina extends Model {}

ProfessorDisciplina.init(
  {
    professor_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    disciplina_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'professor_disciplina',
    tableName: 'professor_disciplinas',
    timestamps: false
  }
);

export default ProfessorDisciplina;
