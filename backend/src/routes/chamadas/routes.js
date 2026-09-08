import { Router } from 'express';
import chamadaController from '../../controllers/chamadaController.js';
import { autenticar } from '../../middlewares/authMiddleware.js';

const router = Router();

router.post('/', autenticar, chamadaController.criarChamada);

export default router;