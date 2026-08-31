import { Router } from 'express';
import disciplinaController from '../../controllers/disciplinaController.js';

const router = Router();

router.get('/', disciplinaController.listarDisciplinas);
router.post('/', disciplinaController.cadastrarDisciplina);
router.put('/:id', disciplinaController.atualizarDisciplina);
router.delete('/:id', disciplinaController.excluirDisciplina);

export default router;
