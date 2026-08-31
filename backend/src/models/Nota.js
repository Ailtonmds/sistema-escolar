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
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'disciplina_id'
    },
    bimestre: {
      type: DataTypes.INTEGER,
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
    tableName: 'notas',
    timestamps: false
  }
);

export default Nota;