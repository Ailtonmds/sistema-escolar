import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';
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
    usuario: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true
    },
    senha: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    turma_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    perfil: {
      type: DataTypes.ENUM('professor', 'admin', 'aluno'),
      allowNull: false,
      defaultValue: 'professor'
    }
  },
  {
    sequelize,
    modelName: 'professor',
    tableName: 'professores',
    timestamps: false,
    hooks: {
      async beforeSave(professor) {
        if (professor.changed('senha') && professor.senha) {
          const valor = String(professor.senha);
          if (!valor.startsWith('$2')) {
            const salt = await bcrypt.genSalt(10);
            professor.senha = await bcrypt.hash(valor, salt);
          }
        }
      }
    },
    defaultScope: {
      attributes: { exclude: ['senha'] }
    }
  }
);

export default Professor;
