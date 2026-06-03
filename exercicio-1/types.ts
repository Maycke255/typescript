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
    name: string;
    pilot: string;
    crewLimit: number;
    crews?: Crew[];
    inMission: false;
}

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


class tripsToSpace {
    //2️⃣ Variavel privada - diz que a classe tera a lista de spaceships
    private spaceshipMents: Spaceship[];

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
                message: `Erro ao listar naves espaciais!`
            }
        }
    }
}

function addNewSpaceship (name: string, pilot: string, crewLimit: Number) {

}

export {}