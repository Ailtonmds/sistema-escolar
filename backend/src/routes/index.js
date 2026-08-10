import express from 'express';
import alunosRoutes from './alunos/routes.js';

const routes = express.Router();

// Ponto de expansão: cada nova missao vira um modulo com seu proprio arquivo de rotas.
// Exemplo: Missao 003 -> ./professores/routes.js
routes.use(alunosRoutes);
// Quando a Missao 002 iniciar, adicionar aqui: routes.use(turmasRoutes);

export default routes;
