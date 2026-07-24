import GitHubApi from '../model/admin/modelAdm.js';
import { Request, Response } from 'express';

class GitHubController {
    async fetchAndSave (req: Request<{ username: string }>, res: Response) {
        try {
            const { username } = req.params;
    
            if (!username) {
                return res.status(404).json({
                    success: false,
                    message: 'Dados incorretos passados atravez da requisição!'
                })
            }
    
            const result = await GitHubApi.fetchAndSaveUser(username);
    
            if (result.success) {
                return res.status(200).json();
            } else {
                return res.status(400).json();
            }
        } catch (error: any) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    async repos (req: Request<{ username: string }>, res: Response) {
        try {
            const { username } = req.params;
    
            if (!username) {
                return res.status(404).json({
                    success: false,
                    message: 'Dados incorretos passados atravez da requisição!'
                })
            }
    
            const result = await GitHubApi.showWitchRepos(username);
    
            if (result.success) {
                return res.status(200).json();
            } else {
                return res.status(400).json();
            }
        } catch (error: any) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    async getAll (req: Request, res: Response) {
        try {
            const result = GitHubApi.showAllUsers();

            if (result.success) {
                return res.status(200).json();
            } else {
                return res.status(400).json();
            }
        } catch (error: any) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    async sumRepos (req: Request, res: Response) {
        try {
            const result = GitHubApi.sumAllRepos();
            
            if (result.success) {
                return res.status(200).json();
            } else {
                return res.status(400).json();
            }
        } catch (error: any) {
            res.status(500).json({
                success: false,
                error: error.message
            });    
        }
    }

    async topFive (req: Request, res: Response) {
        try {
            const result = GitHubApi.topFiveUsers();

            if (result.success) {
                return res.status(200).json();
            } else {
                return res.status(400).json();
            }
        } catch (error: any) {
            res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}

export default new GitHubController();