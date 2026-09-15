import { Router } from 'express';
import auditoriaController from '../../controllers/auditoriaController.js';
import { autenticar, exigirAdmin } from '../../middlewares/authMiddleware.js';

const router = Router();

router.use(autenticar, exigirAdmin);

router.get('/', auditoriaController.listarAuditoria);
router.get('/indicadores', auditoriaController.obterIndicadores);

export default router;