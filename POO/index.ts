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