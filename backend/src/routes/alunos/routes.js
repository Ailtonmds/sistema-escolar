import express from 'express';
import alunoController from '../../controllers/alunoController.js';

const routes = express.Router();

routes.get(
  '/',
  alunoController.listarAlunos
);

routes.post(
  '/',
  alunoController.cadastrarAluno
);

routes.put(
  '/:id',
  alunoController.atualizarAluno
);

routes.delete(
  '/:id',
  alunoController.excluirAluno
);

export default routes;