import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Chamada extends Model {}

Chamada.init(
  {
    professor_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    turma_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    disciplina_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    data_aula: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    quantidade_aulas: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    titulo_plano: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'chamada',
    tableName: 'chamadas',
    timestamps: false
  }
);

export default Chamada;