import express from 'express';
import turmaController from '../../controllers/turmaController.js';
import { autenticar, exigirAdmin } from '../../middlewares/authMiddleware.js';

const routes = express.Router();

routes.use(autenticar);

routes.get('/', turmaController.listarTurmas);
routes.post('/', exigirAdmin, turmaController.cadastrarTurma);
routes.put('/:id', exigirAdmin, turmaController.atualizarTurma);
routes.delete('/:id', exigirAdmin, turmaController.excluirTurma);

export default routes;