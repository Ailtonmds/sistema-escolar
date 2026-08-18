import { Router } from 'express';
import alunoRoutes from './alunos/routes.js';
import turmaRoutes from './turmas/routes.js';
import notaRoutes from './notas/routes.js';

const router = Router();

router.use('/api/alunos', alunoRoutes);
router.use('/api/turmas', turmaRoutes);
router.use('/api/notas', notaRoutes);

export default router;