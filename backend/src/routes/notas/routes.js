import { Router } from 'express';
import notaController from '../../controllers/notaController.js';
import { autenticar, exigirAdmin } from '../../middlewares/authMiddleware.js';

const router = Router();

router.get(
  '/estatisticas',
  autenticar,
  notaController.obterEstatisticas
);

router.get(
  '/ranking',
  autenticar,
  notaController.obterRankingBoletins
);

router.get(
  '/media-por-disciplina',
  autenticar,
  notaController.obterMediaPorDisciplina
);

router.get(
  '/boletim/:aluno_id',
  autenticar,
  notaController.obterBoletimAluno
);

router.get(
  '/mini-boletim/:aluno_id',
  autenticar,
  notaController.obterMiniBoletim
);

router.get('/', autenticar, notaController.listarNotas);
router.post('/', autenticar, exigirAdmin, notaController.cadastrarNota);
router.put('/:id', autenticar, exigirAdmin, notaController.atualizarNota);
router.delete('/:id', autenticar, exigirAdmin, notaController.excluirNota);

export default router;