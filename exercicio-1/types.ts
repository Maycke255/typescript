/* 
Crie um arquivo TypeScript
contendo as 4 funções
descritas abaixo ->

A primeira função deverá salvar um objeto spaceship com, no minimo, as seguintes propriedades:
name, que deverá ser inserido pelo usuário
pilot, que deverá ser inserido pelo usuário
crewLimit, o tamanho máximo da tripulação que
deverá ser inserido pelo usuário
crew, um array de strings inicialmente vazio
inMission, que inicialmente deve ser falso

A segunda função deverá adicionar um membro à tripulação de uma determinada nave. No
entanto o tamanho máximo de tripulantes não pode ser excedido.

A terceira função deverá enviar uma determinada nave em uma missão caso ela já não esteja. Para isso é preciso que 1/3 da sua tripulação esteja
preenchida, arredondando para baixo.

A quarta função deverá listar todas as naves registradas e suas respectivas informações.
*/

interface Crew {
    name: string;
}

//1️⃣ Interface - Define o formato do objeto:
interface Spaceship {
    id: number;
    name: string;
    pilot: string;
    crewLimit: number;
    crews: Crew[];
    inMission: boolean;
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

declare global {
    var menu: string
}


class TripsToSpace {
    //2️⃣ Variavel privada - diz que a classe tera a lista de spaceships
    private spaceshipMents: Spaceship[];
    private nextId: number = 1;

    //3️⃣ Construtor - Inicializa essa lista como array vazia para que seja preenchida com decorrer do métodos
    // Todos essas três partes estão interligadas
    constructor () {
        this.spaceshipMents = [];
    }

    // Aqui o dado retornado não e a array do construtor, mas sim o tipo de dado, que vai ser spaceship em forma de array
    getAll (): ApiResponse<Spaceship[]> { // <- Aqui e so o tipo
        try {
            if (this.spaceshipMents.length === 0) {
                return {
                    success: true,
                    message: 'Sem naves atualmente.',
                    data: []
                }
            }
    
            return { success: true, data: this.spaceshipMents } // <- Aqui e a array REAL
        } catch (error: any) {
            return {
                success: false,
                message: `Erro ao listar naves espaciais: ${error.message}!`
            }
        }
    }

    newSpaceShip (name: string, pilot: string, crewLimit: number): ApiResponse<Spaceship[]> {
        try {
            if (!name || !pilot) {
                return { success: false, message: 'Nome e piloto são obrigatórios.' };
            }

            if (crewLimit <= 0) {
                return { success: false, message: 'Limite de tripulantes deve ser maior que zero.' };
            }

            const spaceshipNameExist = this.spaceshipMents.find(s => s.name === name);

            if (spaceshipNameExist) {
                return { success: false, message: 'Nave já cadastrada.' };
            }

            const spaceship = {
                id: this.nextId++,
                name: name,
                pilot: pilot,
                crewLimit: crewLimit,
                crews: [],
                inMission: false
            }

            this.spaceshipMents.push(spaceship);

            return { success: true, data: this.spaceshipMents, message: 'Nave espacial criada com sucesso'}
        } catch (error: any) {
            return {
                success: false,
                message: `Erro ao criar nave espacial: ${error.message}!`
            }
        }
    }

    addNewMember (id: number, member: string): ApiResponse<Spaceship[]> {
        try {
            if (this.spaceshipMents.length === 0) {
                return {
                    success: true,
                    message: 'Sem naves atualmente.',
                    data: []
                }
            }

            const spaceshipMentsFound = this.spaceshipMents.find(s => s.id === id);
            
            if (spaceshipMentsFound === undefined) {
                return {
                    success: false,
                    message: 'Nave informada não cadastrada!'
                }
            }

            if (spaceshipMentsFound.crews.length >= spaceshipMentsFound.crewLimit) {
                return {
                    success: false,
                    message: 'Limite maximo de tripulantes excedidos!'
                }
            }
            
            spaceshipMentsFound.crews.unshift({name: member});

            return { success: true, data: this.spaceshipMents, message: `Tripulante ${member} adicionado a nave espacial com sucesso.` }
        } catch (error: any) {
            return {
                success: false,
                message: `Erro ao adicionar novo membro a nave espacial: ${error.message}!`
            }
        }
    }

    sendToTheMission (id: number): ApiResponse<Spaceship[]> {
        try {
            if (this.spaceshipMents.length === 0) {
                return {
                    success: true,
                    message: 'Sem naves atualmente.',
                    data: []
                }
            }

            const spaceshipMentsFound = this.spaceshipMents.find(s => s.id === id);
            
            if (spaceshipMentsFound === undefined) {
                return {
                    success: false,
                    message: 'Nave informada não cadastrada!'
                }
            }

            if (spaceshipMentsFound.inMission === true) {
                return {
                    success: true,
                    message: 'A nave informada já esta em missão!'
                }
            }

            const minimumNumberOfCrewMembers = Math.floor(spaceshipMentsFound.crewLimit / 3);

            if (spaceshipMentsFound.crews.length < minimumNumberOfCrewMembers) {
                return {
                    success: false,
                    message: `Tripulação insuficiente! Minimo necessário: ${minimumNumberOfCrewMembers}`
                }
            }

            spaceshipMentsFound.inMission = true;
            return { 
                success: true,
                data: this.spaceshipMents,
                message: `Nave espacial ${spaceshipMentsFound.name} enviada para a missão! 🚀🌠`
            }
        } catch (error: any) {
            return {
                success: false, 
                message: `Erro ao enviar nave espacial para missão: ${error.message}!`
            }
        }
    }
}

export default new TripsToSpace;

export {}

//=================================================================================================================================
// ☣ USANDO INTERFACE GENERICA ->
// <T> é um parâmetro de tipo — funciona como uma variável, mas para tipos. Resumindo em vez de fixar o tipo de uma propriedade, 
// você deixa ele ser definido na hora de usar, assim podendo atribuir qualquer tipoo de valor para aquele resultado.
//Você pode ter mais de um <T>:
interface Par<A, B> {
  primeiro: A;
  segundo: B;
}

const par: Par<string, number> = { primeiro: "idade", segundo: 25 };

/* O nome T é uma convenção
Você pode usar qualquer nome, mas existem convenções comuns:
Nome    Uso típico
T       Type — genérico geral
K       Key — chave
V       Value — valor
E       Element — elemento de lista
↪ interface Pessoa<T> significa: "essa interface tem uma parte do tipo que só será definida quando alguém for usá-la".
É uma forma de escrever código flexível e reutilizável sem abrir mão da segurança de tipos. */
//=================================================================================================================================