//Orientação a objetos

// - Encapsulamento, é a forma de proteger os dados de uma classe, para que não sejam acessados diretamente, e sim através de métodos, 
// podemos definir os atributos como privados ou protegidos, e assim só podem ser acessados dentro da classe ou por classes filhas.
class People {
    public name: string; //Acessivel de fora normalmente, pode-se acessar e alterar o valor do atributo de qualquer lugar do codigo.
    public age: number; //Acessivel de fora normalmente, pode-se acessar e alterar o valor do atributo de qualquer lugar do codigo.
    private cpf: string; //Acessivel apenas dentro da classe, não pode ser acessado de fora.
    protected rg: string; //Acessivel dentro da classe e em classes filhas, mas não pode ser acessado de fora.
    private capital : number = 0; //Acessivel apenas dentro da classe, não pode ser acessado de fora.

    constructor(name: string, age: number, cpf: string, rg: string) {
        this.name = name;
        this.age = age;
        this.cpf = cpf;
        this.rg = rg;
    }

    deposit(amount: number): void {
        if (amount > 0) {
            this.capital += amount; //Reatribuindo o valor do capital, somando o valor do depósito ao capital atual.
            console.log(`Depósito de R$${amount} realizado com sucesso!`);
        } else {
            console.log('Valor de depósito inválido.');
        }
    }
}

class legalEntity extends People {
    private cnpj: string; //Acessivel apenas dentro da classe, não pode ser acessado de fora.

    constructor(name: string, age: number, cpf: string, rg: string, cnpj: string) {
        super(name, age, cpf, rg); //Chamando o construtor da classe pai (People) para inicializar os atributos herdados.
        this.cnpj = cnpj;
    }

    getCNPJ(): string {
        return this.cnpj; //Retornando o valor do CNPJ.
    }

    setCNPJ(_cnpj: string): void {
        this.cnpj = _cnpj;
    }
}

const person1 = new People('João', 30, '123.456.789-00', 'MG-12.345.678');
person1.age = 31; //Alterando o valor do atributo age, que é público e acessível de fora da classe.
person1.deposit(1000); //Depósito de R$1000 realizado com sucesso!

const company1 = new legalEntity('Empresa X', 5, '987.654.321-00', 'SP-98.765.432', '12.345.678/0001-90');
console.log(company1.getCNPJ()); //12.345.678/0001-90

// =====================================================================================================================================
//O que e isso que esta autocompletando? E uma IA do VS code? Esta me ajudando a escrever o codigo, mas eu posso desativar 
// isso se quiser, e so ir nas configurações do VS code e procurar por "IntelliCode" e desativar a opção "Enable IntelliCode completions".
// =====================================================================================================================================

// =============================================================================================================================================

//Generics, e uma forma de criar funções e classes que podem trabalhar com diferentes tipos de dados, sem precisar duplicar o código para cada tipo.
//Usamos ela praticamente como uma função quer recebe tecnicamente um parametro, ela praticamente retorna o que ela recebe, nesse caso e uma pratica comum em APIs
// - A interface generica recebe o dado atravez da requisição e retorna ele para o usuario se der certo ou não
interface SuccessResponse <T> {
    success: true;
    data?: T;
    message?: string;
}

interface ErrorResponse {
    success: false;
    message?: false;
}

type ApiResponse <R> = SuccessResponse<R> | ErrorResponse;

//ex:
function rerturning <T>(value: T): T { //Nesse caso o 
    return value
}

const result = rerturning(`Olá`);

const text = rerturning("olá");   // TypeScript sabe que é string ✅
const number = rerturning(42);     // TypeScript sabe que é number ✅
const active = rerturning(true);    // TypeScript sabe que é boolean ✅

// =============================================================================================================================================

//Decorators
//Decorators são uma especie de anotação ou marcação que colocamos em cima de classes, métodos ou funções para adicionar um comportamento extra
//na maioria das vezes sem modificar o comportamento original. Ex:
/* 
@minhaAnotacao
class MinhaClasse { } */

//Obs:
//E necessario ativa-lo no tsconfig antes:
/* {
  "compilerOptions": {
    "experimentalDecorators": true
  }
} */

function Log () {
    return function (target: any, key: any, descriptor: any) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            console.log(`-------------------------------------------------------`);
            console.log(`Chamando o método ${key} com os parametros: ${JSON.stringify(args)}`);

            const result = originalMethod.apply(this, args);

            console.log(`O método ${key} retornou o valor: ${JSON.stringify(result)}`);
            console.log(`-------------------------------------------------------`);

            return result;
        }
    }
}

class Planet {
    name: string;

    constructor (name: string) {
        this.name = name;
    }

    @Log()
    invertName () {
        return this.name.split('').reverse().join('');
    }

    @Log()
    calculate (value: number) {
        console.log(`Calculando ${value} duas vezes`);
        return value * 2;
    }
}

/* RESUMO:
A função decoradora (recebe target, key, descriptor)

O que Log() retorna é a função que o TypeScript de fato aplica ao método decorado. Ela é chamada automaticamente uma vez, 
quando a classe é definida (não quando o método é chamado!), com três argumentos:

target: o protótipo da classe (Planet.prototype)
key: o nome do método como string ("invertName" ou "calculate")
descriptor: um objeto que descreve o método, no formato PropertyDescriptor. A parte que interessa é descriptor.value, que é a função original do método.

Depois, você sobrescreve descriptor.value com uma nova função. É essa nova função que vai efetivamente rodar toda vez que alguém chamar 
planet.invertName() ou planet.calculate(5)

Repare que:

...args: any[] captura quaisquer argumentos que o método receber.
originalMethod.apply(this, args) chama o método verdadeiro, preservando o this (a instância do Planet) e passando os argumentos adiante.
O resultado é guardado em result, logado, e depois retornado — assim quem chamou o método continua recebendo o valor certo, só que "por dentro" 
do log passou a ser executado também.
Linha do tempo de execução
Ao carregar o módulo/classe: Log() roda, e a função decoradora roda para cada método marcado com @Log(), trocando descriptor.value pela versão "logada". 
Isso acontece uma única vez, na definição da classe.
Quando você chama planet.calculate(5): na verdade você está chamando a função substituída, que:
loga a entrada,
chama a função original via apply,
loga a saída,
retorna o resultado.
Por que isso é útil

Esse padrão se chama decorator de interceptação (ou "wrapping"): ele permite adicionar comportamento (logging, medição de tempo, cache, 
validação, etc.) sem alterar o código do método original e sem precisar repetir esse código em cada método. Basta anotar com @Log() qualquer método que você queira monitorar.

É essencialmente açúcar sintático para isto, escrito manualmente:*/
const planet = new Planet(`Terra`);

planet.calculate(5);
planet.invertName();