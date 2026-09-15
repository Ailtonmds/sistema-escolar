import { Router } from 'express';
import frequenciaController from '../../controllers/frequenciaController.js';
import { autenticar, exigirAdmin } from '../../middlewares/authMiddleware.js';

const router = Router();

router.get(
  '/estatisticas',
  autenticar,
  frequenciaController.obterEstatisticas
);

router.get(
  '/resumo',
  autenticar,
  frequenciaController.obterResumoFrequencias
);

router.get(
  '/aluno/:aluno_id',
  autenticar,
  frequenciaController.obterFrequenciasAluno
);

router.get('/', autenticar, frequenciaController.listarFrequencias);
router.post('/', autenticar, exigirAdmin, frequenciaController.adicionarFrequencia);
router.put('/:id', autenticar, exigirAdmin, frequenciaController.atualizarFrequencia);
router.delete('/:id', autenticar, exigirAdmin, frequenciaController.excluirFrequencia);

export default router;