"use strict";
const { evaluateRegex } = require("../src/util/invalid-regex-error");
const formatFirstLetter = Symbol("firstLetter");

class Person {
  //(\w+):\s.*
  //$1,
  constructor([
    nome,
    nacionalidade,
    estadoCivil,
    documento,
    rua,
    numero,
    bairro,
    cidade,
  ]) {
    // (\w+),
    // this.$1 = $1;
    this.nome = nome;
    this.nacionalidade = this[formatFirstLetter](nacionalidade);
    this.estadoCivil = this[formatFirstLetter](estadoCivil);
    this.documento = documento.replace(evaluateRegex(/\D/g), "");
    this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/)).join();
    this.numero = numero;
    this.bairro = bairro.match(evaluateRegex(/(?<=\s).*$/)).join();
    this.cidade = cidade.replace(evaluateRegex(/\.$/), "");
  }

  [formatFirstLetter](prop) {
    const firstLetterExp = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/g);

    return prop.replace(firstLetterExp, (fullMatch, group1, group2, index) => {
      return `${group1.toUpperCase()}${group2.toLowerCase()}`;
    });
  }
}

module.exports = { Person };
