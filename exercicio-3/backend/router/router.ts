import { Router } from "express";
import GitHubController from '../controller/controllerAdm'

const router = Router();

/* Resumo de mudanças nas rotas
                            async method()	        method = async () =>
this no router direto	    ❌ perde	          ✅ preserva
Precisa de função anônima	✅ sim	          ❌ não
Estilo	                    Método tradicional  Arrow function */

router.post('/api/users/:username', (req, res) => GitHubController.fetchAndSave(req, res));
router.get('/api/users/:username/repos', (req, res) => GitHubController.repos(req, res));

router.get('/api/users', (req, res) => GitHubController.getAll(req, res));

router.get('/api/users/sum', (req, res) => GitHubController.sumRepos(req, res));
router.get('/api/users/topfive', (req, res) => GitHubController.topFive(req, res));

export default router;