import { Router } from 'express';

import alunoRoutes from './alunos/routes.js';
import turmaRoutes from './turmas/routes.js';
import notaRoutes from './notas/routes.js';
import frequenciaRoutes from './frequencias/routes.js';

const router = Router();

router.use('/api/alunos', alunoRoutes);
router.use('/api/turmas', turmaRoutes);
router.use('/api/notas', notaRoutes);
router.use('/api/frequencias', frequenciaRoutes);

export default router;