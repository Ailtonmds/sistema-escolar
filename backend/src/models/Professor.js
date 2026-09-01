import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Professor extends Model {}

Professor.init(
  {
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: true,
      unique: true
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    turma_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'professor',
    tableName: 'professores',
    timestamps: false
  }
);

export default Professor;
