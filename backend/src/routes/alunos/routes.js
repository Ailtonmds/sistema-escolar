import express from 'express';
import alunoController from '../../controllers/alunoController.js';

const routes = express.Router();

routes.get(
  '/alunos',
  alunoController.listarAlunos
);

routes.post(
  '/alunos',
  alunoController.cadastrarAluno
);

routes.put(
  '/alunos/:id',
  alunoController.atualizarAluno
);

routes.delete(
  '/alunos/:id',
  alunoController.excluirAluno
);

export default routes;