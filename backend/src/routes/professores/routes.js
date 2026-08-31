import { Router } from 'express';
import professorController from '../../controllers/professorController.js';

const router = Router();

router.get('/', professorController.listarProfessores);
router.post('/', professorController.cadastrarProfessor);
router.put('/:id', professorController.atualizarProfessor);
router.delete('/:id', professorController.excluirProfessor);

export default router;
