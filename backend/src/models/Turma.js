import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Turma extends Model {}

Turma.init(
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },

    serie: {
      type: DataTypes.STRING,
      allowNull: false
    },

    ano: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    // CAMPO ADICIONADO (MISSÃO 002):
    professor_responsavel: {
      type: DataTypes.STRING,
      allowNull: true // Pode ser true ou false, dependendo se é obrigatório
    }
  },
  {
    sequelize,
    modelName: 'turma',
    tableName: 'turmas'
  }
);

export default Turma;