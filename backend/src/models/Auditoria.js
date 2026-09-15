import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Auditoria extends Model {}

Auditoria.init(
  {
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    usuario_nome: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    perfil: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    operacao: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    recurso: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    recurso_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    detalhes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    criado_em: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'auditoria',
    tableName: 'auditoria',
    timestamps: false
  }
);

export default Auditoria;