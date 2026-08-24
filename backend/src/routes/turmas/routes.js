import express from 'express';
import turmaController from '../../controllers/turmaController.js';

const routes = express.Router();
routes.get(
  '/',
  turmaController.listarTurmas
);
routes.post(
  '/',
  turmaController.cadastrarTurma
);
routes.put(
  '/:id',
  turmaController.atualizarTurma
);
routes.delete(
  '/:id',
  turmaController.excluirTurma
);
export default routes;