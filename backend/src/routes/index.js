import { Router } from 'express';

import alunoRoutes from './alunos/routes.js';
import turmaRoutes from './turmas/routes.js';
import notaRoutes from './notas/routes.js';
import frequenciaRoutes from './frequencias/routes.js';
import disciplinaRoutes from './disciplinas/routes.js';
import professorRoutes from './professores/routes.js';

const router = Router();

router.use('/api/alunos', alunoRoutes);
router.use('/api/turmas', turmaRoutes);
router.use('/api/notas', notaRoutes);
router.use('/api/frequencias', frequenciaRoutes);
router.use('/api/disciplinas', disciplinaRoutes);
router.use('/api/professores', professorRoutes);

export default router;