import express from 'express';
import alunoController from '../../controllers/alunoController.js';
import { autenticar, exigirAdmin } from '../../middlewares/authMiddleware.js';

const routes = express.Router();

routes.use(autenticar);

routes.get('/', alunoController.listarAlunos);
routes.post('/', exigirAdmin, alunoController.cadastrarAluno);
routes.put('/:id', exigirAdmin, alunoController.atualizarAluno);
routes.delete('/:id', exigirAdmin, alunoController.excluirAluno);

export default routes;