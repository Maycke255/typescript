import { Router } from "express";
import GitHubController from '../controller/controllerAdm'

const router = Router();

router.get('/api/index', GitHubController.getAll);

export default router;