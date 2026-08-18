import express from 'express';
import turmaController from '../../controllers/turmaController.js';

const routes = express.Router();
routes.get(
  '/turmas',
  turmaController.listarTurmas
);
routes.post(
  '/turmas',
  turmaController.cadastrarTurma
);
routes.put(
  '/turmas/:id',
  turmaController.atualizarTurma
);
routes.delete(
  '/turmas/:id',
  turmaController.excluirTurma
);
export default routes;