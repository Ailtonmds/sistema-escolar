import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Disciplina extends Model {}

Disciplina.init(
  {
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    descricao: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'disciplina',
    tableName: 'disciplinas',
    timestamps: false
  }
);

export default Disciplina;
