import TripsToSpace from "./types.ts";

alert('Bem vindo ao cadastramento de naves espaciais.');
let menu: number;

class System {
    // 1
    index (): void {
        const result = TripsToSpace.getAll();

        if (result.success === false) {
            return alert(result.message);
        } else {
            let spaceships = result.data?.map((e) => {
                let list = `Nave número: ${(e.id)}\n
                Nome da nave: ${e.name}
                Piloto: ${e.pilot}
                Limite de tripulantes: ${e.crewLimit}
                Tripulantes atuais: ${e.crews}
                Em missão? ${e.inMission}
                ------------------------------------------`

                return list;
            }).join('\n');

            return alert(spaceships);
        }
    }

    //2
    addSpaceshipment (): void | number {
        const name: string | null = prompt(`Qual nome da espaçonave?`);

        if (name === null) {
            alert('O nome da espasonave não pode estar vazio!');
            return menu;
        }

        const pilot: string | null = prompt(`Qual o nome do piloto da espaçonave?`);

        if (pilot === null) {
            alert('O nome do piloto não pode estar vazio!');
            return menu;
        }

        const numberOfMembers: number | null = Number(prompt(`Qual a quantidade de membros que a espaçonave deve ter?`));

        if (numberOfMembers === null) {
            alert('A quantidade de membros não pode ser vazia!');
            return menu;
        }

        const result = TripsToSpace.newSpaceShip(name, pilot, numberOfMembers);

        if (result.success === false) {
            return alert(result.message);
        } else {
            return alert(`${result.message}\n
                        ----------&----------
                        ${result.data}`)
        }
    }

    //3
    addMember (): void | number {
        
    }
}

function displayMenu () {
    const numberOfShips = TripsToSpace.returnNumberOfShips();
    
    menu = Number(prompt(`O que deseja fazer? Selecione a opção usando o número correspondente a sua frente.\n
                        - Quantidade de naves cadastradas: ${numberOfShips}\n\n
                        1. Listar naves cadastradas.\n
                        2. Cadastrar nova nave.\n
                        3. Cadastrar novo membro para uma nave.\n
                        4. Enviar uma nave para a expedição.\n
                        5. Fechar programa...`));
}

function showMenu () {
    do {
        
    } while (menu !== 5);
}