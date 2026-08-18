import express from 'express';
import turmaController from '../../controllers/turmaController.js';

const routes = express.Router();

routes.get('/turmas', turmaController.listarTurmas);
routes.post('/turmas', turmaController.cadastrarTurma);
routes.put('/turmas', turmaController.atualizarTurma);
routes.delete('/turmas', turmaController.excluirTurma);

export default routes;