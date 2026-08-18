import { Router } from 'express';
import notaController from '../../controllers/notaController.js';

const router = Router();

router.get('/', notaController.listarNotas);
router.post('/', notaController.cadastrarNota);
router.get('/boletim/:aluno_id', notaController.obterBoletimAluno);
router.get('/estatisticas', notaController.obterEstatisticas);

export default router;