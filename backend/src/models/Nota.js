import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Nota extends Model {}

Nota.init(
  {
    aluno_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    disciplina: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bimestre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nota: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'nota',
    tableName: 'notas'
  }
);

export default Nota;