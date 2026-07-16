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
    private users: GitHubUser[] = [];

    //Cadastrar um novo usuario na lista 
    async fetchAndSaveUser (username: string): Promise<ApiResponse<GitHubUser[]>> {
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            const data: GitHubUser | GitHubNotFound = await response.json();

            //Type guard - e um verificador em tempo real, ele vai verificar se o objeto message veio na resposta do data
            //EX: "message" existe em data? Se existir que e a nossa menssagem de erro que definimos "Not Found" retorna erro
            if ("message" in data) {
                return {
                    success: false,
                    message: `Usuario "${username}" não encontrado!`
                }
            }

            const userExist = this.users.find(u => u.id === data.id);
            if (userExist) {
                return {
                    success: false,
                    message: `Usuario "${username}" já existe na lista!`
                }
            }

            this.users.push(data);
            return {
                success: true,
                data: this.users,
                message: `Usuario "${username} salvo com sucesso!"`
            }
        } catch (error: any) {
            return {
                success: false,
                message: `Erro interno ao cadastrar novo usuario a lista! ${error.message}`
            }
        }
    }

    //O retorno dessa função sera um objeto contendo o usuario do git hub correspondente e uma array de repositorios
    async showWitchRepos (username: string): Promise<ApiResponse <{ user: GitHubUser, repos: GitHubRepo[]}>> {
        try {
            const userExist = this.users.find(u => u.login === username);
            if (!userExist) {
                return {
                    success: false,
                    message: `Usuario "${username}" não existe na lista!`
                }
            }

            const response = await fetch(userExist.repos_url);
            const repos: GitHubRepo[] = await response.json();

            return {
                success: true,
                data: { user: userExist, repos: repos }
            }
        } catch (error: any) {
            return {
                success: false,
                message: `Erro interno ao exibir repositorios! ${error.message}`
            }
        }
    }

    showAllUsers (): ApiResponse<GitHubUser[]> {
        try {
            if (this.users.length === 0) {
                return {
                    success: false,
                    message: 'A lista de usuarios esta vazia'
                }
            }

            return {
                success: true,
                data: this.users
            }
        } catch (error: any) {
            return {
                success: false,
                message: `Erro interno ao exibir todos os usuarios! ${error.message}`
            }
        }
    }

    sumAllRepos (): ApiResponse<number> {
        try {
            if (this.users.length === 0) {
                return {
                    success: false,
                    message: 'A lista de usuarios esta vazia'
                }
            }

            const total = this.users.reduce((sum, user) => sum + user.public_repos, 0);
            return {
                success: true,
                data: total
            }
        } catch (error: any) {
            return {
                success: false,
                message: `Erro interno ao fazer contagem de todos os usuarios! ${error.message}`
            }
        }
    }

    topFiveUsers (): ApiResponse<GitHubUser[]> {
        try {
            if (this.users.length === 0) {
                return {
                    success: false,
                    message: 'A lista de usuarios esta vazia'
                }
            }

            const top5 = [...this.users]
            .sort((a, b) => b.public_repos - a.public_repos)
            .slice(0, 5);

            return {
                success: true,
                data: top5
            }
        } catch (error: any) {
            return {
                success: false,
                message: `Erro interno ao fazer contagem de todos os usuarios! ${error.message}`
            }
        }
    }
}

export default new GitHubApi();