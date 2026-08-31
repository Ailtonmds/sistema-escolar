import { Router } from 'express';
import notaController from '../../controllers/notaController.js';

const router = Router();

router.get('/', notaController.listarNotas);
router.post('/', notaController.cadastrarNota);
router.get('/boletim/:aluno_id', notaController.obterBoletimAluno);
router.get('/mini-boletim/:aluno_id', notaController.obterMiniBoletim);
router.get('/estatisticas', notaController.obterEstatisticas);
router.get('/ranking', notaController.obterRankingBoletins);
router.get('/media-por-disciplina', notaController.obterMediaPorDisciplina);

export default router;