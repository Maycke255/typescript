/* 
Crie um arquivo TypeScript
com as funções listadas
abaixo. Utilize interfaces
para tipar as respostas das
requisições.

1. Uma função que recebe um nome de
usuário do GitHub e realiza uma requisição
GET para obter os dados dele através da API
pública do GitHub.
    ↘ 
    A requisição deve ser feita através da seguinte URL:
    https://api.github.com/users/<nome_do_usuario>

    Dica: utiliza a própria API
    fetch do javascript ou express

    Dica: Ao usar o fetch o retorno será
    uma Response (pode ser percebido
    com a ajuda do TypeScript) que ainda
    precisa ser convertida para json. Isso
    pode ser obtido com a ajuda do
    método .json0, que retorna uma
    Promise.

    De todos os dados
    retornados nós utilizaremos
    apenas os seguintes:
    id, do tipo number
    login, do tipo string
    name, do tipo string
    bio, do tipo string
    public_repos, do tipo
    number
    repos_url, do tipo string

    Dica: para validação, caso o
    usuário não seja
    encontrado no github o
    retorno da API será um
    objeto
    {
    message: "Not Found"

    O usuário retornado deverá
    ser salvo em uma lista que
    conterá todos os usuários

2. Uma função que mostra
as informações salvas de
um determinado usuário e
alguns de seus repositórios
públicos
    ↘ 
    A requisição deve ser feita
    através da URL salva na
    propriedade repos_url

    O retorno da API será um
    array de repositórios

    De todos os dados dos
    repositórios retornados nós
    exibiremos apenas os
    seguintes:
    name, do tipo string
    description, do tipo string
    fork, do tipo boolean
    stargazers_count, do tipo
    number


3. Uma função que mostra
todos os usuários salvos

4. Uma função que calcula
a soma de repositórios dos
usuários salvos na lista e
mostre o resultado

5. Uma função que mostre o
top cinco de usuários com
maior número de repositórios
públicos (nome e quantidade)
*/

//=============================================
// CONFIGURAÇÕES DE INSTALAÇÕES
//=============================================
/* 
typescript      o compilador TS
@types/node     tipos do Node (fs, path, etc)
@types/express  tipos do Express
tsx             roda .ts direto sem compilar
*/

import express from 'express';
import router from './router/router';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`API rodando na porta: http://localhost:${PORT}`));