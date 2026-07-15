//PRIMEIRO FUNÇÕES BÁSICAS PARA BUSCAR OS DADOS NA API

interface GitHubUser {
    id: number;
    login: string;
    name: string;
    bio: string;
    public_repos: number;
    repos_url: string;
}

interface GitHubRepo {
    name: string;
    description: string;
    fork: boolean;
    stargazers_count: number;
}

interface GitHubNotFound {
    message: string;
}

interface SuccessResponse<T> {
    success: true;
    data?: T;
    message?: string;
}

interface ErrorResponse {
    success: false;
    message?: string;
}

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

class GitHubApi {
    private users = [];

    constructor () {
        this.users = [];
    }

    async fetchAndSaveUser (username: string): Promise<ApiResponse<GitHubUser>> {
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            const data: GitHubUser | GitHubNotFound = await response.json();

            if ("message" in data) {
                return {
                    success: false,
                    message: `Usuario "${username}" não encontrado!`
                }
            }

            const userExist = this.users.find(u => u.)
        } catch (error: any) {
            
        }
    }
}