import { Router } from 'express';
import disciplinaController from '../../controllers/disciplinaController.js';
import { autenticar, exigirAdmin } from '../../middlewares/authMiddleware.js';

const router = Router();

router.use(autenticar);

router.get('/', disciplinaController.listarDisciplinas);
router.post('/', exigirAdmin, disciplinaController.cadastrarDisciplina);
router.put('/:id', exigirAdmin, disciplinaController.atualizarDisciplina);
router.delete('/:id', exigirAdmin, disciplinaController.excluirDisciplina);

export default router;