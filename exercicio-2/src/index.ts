/*
----- Criando Tipos ----- 
Crie um arquivo TypeScript
que possua as 5 funções
descritas abaixo

1. Uma função que salva um objeto planet
com as seguintes propriedades:
nome: inserido pelo usuário
coordenadas: inserido pelo usuário, salvo
como uma tupla de quatro elementos
numéricos
situação: inserido pelo usuário, salvo
como uma string que pode ser
"habitado", "habitável", "inabitável",
"inexplorado"
satélites: uma lista com os seus nomes

2. Uma função que atualiza
a situaçao de um
determinado planeta

3. Uma função que adiciona
um satélite a um
determinado planeta

4. Uma função que remove
um satélite de um
determinado planeta

5. Uma função que lista os
planetas salvos e todas as
suas informações*/

//Types - usado para definir o tipo de um dado, aqui definimos que o type de cordenadas sera uma array de strings para as ordenadas
type Coordinates = [x: number, y: number, z: number, w: number];

//Type - Mesma coisa, porem usamos o Union Types, e um tipo que define apenas um unico dado para aquele dado e nada mais
type Situation = 'habitado' | 'habitavel' | 'inabitavel' | 'inexplorado';

//Type Guard - É uma função que ensina o TypeScript qual é o tipo de um valor em tempo de execução.
//Função par averificar se a situação enviada pela requisição e veridica
//⚛ valor is Situation é um type guard — ele diz ao TypeScript: "se essa função retornar true, pode confiar que o valor é do tipo Situacao".
function isStituationForTrue (valor: string): valor is Situation {
    return ['habitado', 'habitavel', 'inabitavel', 'inexplorado'].includes(valor); // "Se essa função retornar true, prometo ao TS que valor e do tipo Situation"
}

//Interface - e como uma classe, ela define a forma ou shape de um objeto, em vez de criarmos "const object = {...}"
//criamos a interface que e literalmente a mesma coisa, ela define também quais objetos são obrigatorios ou opcionais
interface Planet {
    id: number; //Identificador do planeta
    name: string; //Nome de cada planeta
    coordinates: Coordinates; //Cordenadas onde se encontra
    situation: Situation; //Situação de cada planeta
    satellites: string[]; //Array de strings simples para os satelites
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

class ManutencaoDePlanetas {
    //variaveis private, são tipo de dados que so podem ser acessados dentro da propria classe onde foram declarados
    //Sera nossa variavel de banco de dados
    private galaxia: Planet[];
    private nextId = 1;

    constructor () {
        this.galaxia = [];
    }

    // 1️⃣ Salvar novo planeta
    saveNewPlanet (name: string, 
        coordinates: Coordinates, 
        situation: Situation
    ): ApiResponse<Planet[]> {
        try {
            if (!name) {
                return { 
                    success: false, 
                    message: 'Nome e obrigatorio!'
                }
            }

            const planetExist = this.galaxia.find(p => p.name === name);

            if (planetExist) {
                return {
                    success: false,
                    message: 'Planeta com esse nome ja existe'
                }
            }

            //Criamos a variavel de acordo com a interface Planet
            const planet: Planet = {
                id: this.nextId++, //Sempre criarmos um novo planeta incrementando, ou seja o atual e 1 o proximo sera 2, ele ira somar automaticamente
                name,
                coordinates,
                situation,
                satellites: []
            }

            this.galaxia.push(planet);

            return {
                success: true,
                data: this.galaxia,
                message: 'Planeta cadastrado com sucesso!'
            }

        } catch (error: any) {
            return {
                success: false,
                message: 'Erro interno ao cadastrar novo planeta'
            }
        }
    }

    //2️⃣ Atualizar algum planeta existente
    updateSituationForPlanet (id: number, newSituation: Situation): ApiResponse<Planet[]> {
        try {
            const idForNumber = Number(id);

            const planetExist = this.galaxia.find(p => idForNumber === p.id);

            if (!planetExist) {
                return {
                    success: false,
                    message: 'Planeta não cadastrado!'
                }
            }

            if (!isStituationForTrue(newSituation)) {
                return {
                    success: false,
                    message: 'Situação informada invalida!'
                }
            }

            planetExist.situation = newSituation;
            return {
                success: true,
                message: 'Situação do planeta atualizada com sucesso',
                data: this.galaxia
            }

        } catch (error: any) {
            return {
                success: false,
                message: 'Erro interno ao salvar novo planeta'
            }
        }
    }

    // 3️⃣ Adicionar satelite ao planeta
    addSatellite (id: number, newSatellite: string): ApiResponse<Planet[]> {
        try {
            const idForNumber = Number(id);

            const planetExist = this.galaxia.find(p => idForNumber === p.id);

            if (!planetExist) {
                return {
                    success: false,
                    message: 'Planeta não cadastrado!'
                }
            }

            const satelliteExist = planetExist.satellites.includes(newSatellite);

            if (satelliteExist) {
                return {
                    success: false,
                    message: `Saelite com nome ${newSatellite} já existe nesse planeta!`
                }
            }

            planetExist.satellites.push(newSatellite);

            return {
                success: true,
                message: 'Satelite adicionado ao planeta com sucesso!',
                data: this.galaxia
            }
        } catch (error: any) {
            return {
                success: false,
                message: 'Erro interno ao adicionar novo satilete ao planeta.'
            }
        }
    }

    // 4️⃣ Remover satelite
    removeSatteliteFromPlanet (id: number, sattelite: string): ApiResponse<Planet[]> {
        try {
            const idForNumber = Number(id);

            const planetExist = this.galaxia.find(p => idForNumber === p.id);

            if (!planetExist) {
                return {
                    success: false,
                    message: 'Planeta não cadastrado!'
                }
            }

            const satelliteExist = planetExist.satellites.indexOf(sattelite);

            if (satelliteExist === -1) {
                return {
                    success: false,
                    message: 'Satelite informado não existe ou esta com nome incorreto'
                }
            }

            planetExist.satellites.splice(satelliteExist, 1);

            return {
                success: true,
                message: `Satelite ${sattelite} removido com sucesso!`,
                data: this.galaxia
            }
        } catch (error: any) {
            return {
                success: false,
                message: 'Erro interno ao remover novo satilete do planeta.'
            }   
        }
    }

    // 5️⃣ Listar todos os planetas
    listGalaxia (): ApiResponse<Planet[]> {
        try {
            if (this.galaxia.length === 0) {
                return {
                    success: true,
                    message: 'Nenhum planeta cadastrado ainda'
                }
            }

            return {
                success: true,
                data: this.galaxia
            }
        } catch (error: any) {
            return {
                success: false,
                
                message: 'Erro interno ao listar planetas'
            }  
        }
    }
}

export default new ManutencaoDePlanetas;
export {};