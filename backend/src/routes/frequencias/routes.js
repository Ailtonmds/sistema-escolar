import { Router } from 'express';
import frequenciaController from '../../controllers/frequenciaController.js';

const router = Router();

router.get('/', frequenciaController.listarFrequencias);

router.post('/', frequenciaController.adicionarFrequencia);

router.get(
  '/aluno/:aluno_id',
  frequenciaController.obterFrequenciasAluno
);

router.get(
  '/estatisticas',
  frequenciaController.obterEstatisticas
);

export default router;