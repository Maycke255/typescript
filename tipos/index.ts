/* Para utilizarmos o typescript, precisamos de uma biblioteca para compila-lo, afinal ele não roda em nada
então a biblioteca transforma ele em codigo JS convencional antigo, assim podemos usar esse codigo em qualquer
navegador, a biblioteca e simplesmente typescript */

//Para criarmos um codigo TS precisamos usar declarações, declaramos as variaveis com seus tipos, por exemplo o newPilot e uma string, podemos definir a variavel como obrigatoria ou
//não seguida de uma interrogação, então logo ela sera undefined ou uma propriedade, e simples assim.
// Obs: Podemos também definir configurações mais especificas para esse arquivo tsconfig.json, que e o arquivo de configuração do TS, nele podemos definir o arquivo de saida e também
// a versão que queremos que o arquivo JS saia, para a versão mais recente por exemplo.
const setPilot = async (newPilot: string, spaceship: { name?: string; pilot: string; speed?: number; inMission?: boolean; }) => {
  spaceship.pilot = newPilot;
}

const accelerate = async  (targetSpeed: number, spaceship: { name?: string; pilot?: string; speed: any; inMission?: boolean; }) => {
  spaceship.speed = targetSpeed;
}

const sendToMission = async (spaceship: { name?: string; pilot?: string; speed?: number; inMission: any; }) => {
  spaceship.inMission = true;
}

const spaceship = {
  name: '',
  pilot: '',
  speed: 0,
  inMission: false,
}

const pilot = "Han Solo";

spaceship.name = "Millennium Falcon";

//Array devemos declarar assim, definindo antes de tudo o tipo que vai dentro da array
const naves: string[] = [];

//Para caso quisermos uma array que receba tipos de objetos diferentes, podemos criar uma tupla, e devemos cria-los apenas com let
type user = [number, string, boolean];
let newUser: user[0] = 1


setPilot(pilot, spaceship);
accelerate(50, spaceship);
sendToMission(spaceship);

console.log(spaceship);