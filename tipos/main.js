"use strict";
/* Para utilizarmos o typescript, precisamos de uma biblioteca para compila-lo, afinal ele não roda em nada
então a biblioteca transforma ele em codigo JS convencional antigo, assim podemos usar esse codigo em qualquer
navegador, a biblioteca e simplesmente typescript */
//Para criarmos um codigo TS precisamos usar declarações, declaramos as variaveis com seus tipos, por exemplo o newPilot e uma string, podemos definir a variavel como obrigatoria ou
//não seguida de uma interrogação, então logo ela sera undefined ou uma propriedade, e simples assim.
// Obs: Podemos também definir configurações mais especificas para esse arquivo tsconfig.json, que e o arquivo de configuração do TS, nele podemos definir o arquivo de saida e também
// a versão que queremos que o arquivo JS saia, para a versão mais recente por exemplo.
const setPilot = async (newPilot, spaceship) => {
    spaceship.pilot = newPilot;
};
const accelerate = async (targetSpeed, spaceship) => {
    spaceship.speed = targetSpeed;
};
const sendToMission = async (spaceship) => {
    spaceship.inMission = true;
};
const spaceship = {
    name: '',
    pilot: '',
    speed: 0,
    inMission: false,
};
const pilot = "Han Solo";
spaceship.name = "Millennium Falcon";
//Array devemos declarar assim, definindo antes de tudo o tipo que vai dentro da array
const naves = [];
setPilot(pilot, spaceship);
accelerate(50, spaceship);
sendToMission(spaceship);
console.log(spaceship);
