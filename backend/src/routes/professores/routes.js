import { Router } from 'express';
import professorController from '../../controllers/professorController.js';
import { autenticar, exigirAdmin } from '../../middlewares/authMiddleware.js';

const router = Router();

router.use(autenticar);

router.get('/', professorController.listarProfessores);
router.post('/', exigirAdmin, professorController.cadastrarProfessor);
router.put('/:id', exigirAdmin, professorController.atualizarProfessor);
router.delete('/:id', exigirAdmin, professorController.excluirProfessor);

export default router;