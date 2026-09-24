"use strict";
//Orientação a objetos
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// - Encapsulamento, é a forma de proteger os dados de uma classe, para que não sejam acessados diretamente, e sim através de métodos, 
// podemos definir os atributos como privados ou protegidos, e assim só podem ser acessados dentro da classe ou por classes filhas.
class People {
    name; //Acessivel de fora normalmente, pode-se acessar e alterar o valor do atributo de qualquer lugar do codigo.
    age; //Acessivel de fora normalmente, pode-se acessar e alterar o valor do atributo de qualquer lugar do codigo.
    cpf; //Acessivel apenas dentro da classe, não pode ser acessado de fora.
    rg; //Acessivel dentro da classe e em classes filhas, mas não pode ser acessado de fora.
    capital = 0; //Acessivel apenas dentro da classe, não pode ser acessado de fora.
    constructor(name, age, cpf, rg) {
        this.name = name;
        this.age = age;
        this.cpf = cpf;
        this.rg = rg;
    }
    deposit(amount) {
        if (amount > 0) {
            this.capital += amount; //Reatribuindo o valor do capital, somando o valor do depósito ao capital atual.
            console.log(`Depósito de R$${amount} realizado com sucesso!`);
        }
        else {
            console.log('Valor de depósito inválido.');
        }
    }
}
class legalEntity extends People {
    cnpj; //Acessivel apenas dentro da classe, não pode ser acessado de fora.
    constructor(name, age, cpf, rg, cnpj) {
        super(name, age, cpf, rg); //Chamando o construtor da classe pai (People) para inicializar os atributos herdados.
        this.cnpj = cnpj;
    }
    getCNPJ() {
        return this.cnpj; //Retornando o valor do CNPJ.
    }
    setCNPJ(_cnpj) {
        this.cnpj = _cnpj;
    }
}
const person1 = new People('João', 30, '123.456.789-00', 'MG-12.345.678');
person1.age = 31; //Alterando o valor do atributo age, que é público e acessível de fora da classe.
person1.deposit(1000); //Depósito de R$1000 realizado com sucesso!
const company1 = new legalEntity('Empresa X', 5, '987.654.321-00', 'SP-98.765.432', '12.345.678/0001-90');
console.log(company1.getCNPJ()); //12.345.678/0001-90
//ex:
function rerturning(value) {
    return value;
}
const result = rerturning(`Olá`);
const text = rerturning("olá"); // TypeScript sabe que é string ✅
const number = rerturning(42); // TypeScript sabe que é number ✅
const active = rerturning(true); // TypeScript sabe que é boolean ✅
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
function Log() {
    return function (target, key, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            console.log(`-------------------------------------------------------`);
            console.log(`Chamando o método ${key} com os parametros: ${JSON.stringify(args)}`);
            const result = originalMethod.apply(this, args);
            console.log(`O método ${key} retornou o valor: ${JSON.stringify(result)}`);
            console.log(`-------------------------------------------------------`);
            return result;
        };
    };
}
class Planet {
    name;
    constructor(name) {
        this.name = name;
    }
    invertName() {
        return this.name.split('').reverse().join('');
    }
    calculate(value) {
        console.log(`Calculando ${value} duas vezes`);
        return value * 2;
    }
}
__decorate([
    Log()
], Planet.prototype, "invertName", null);
__decorate([
    Log()
], Planet.prototype, "calculate", null);
const planet = new Planet(`Terra`);
planet.calculate(5);
planet.invertName();
