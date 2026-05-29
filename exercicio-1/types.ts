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
    name?: string;
}

let ships: [name: string, 
    pilot: string,
    crewLimit: number,
    Crew,
    inMission: boolean
];
