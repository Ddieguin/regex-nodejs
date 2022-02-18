"use strict";

const { Person } = require("../person");
const { evaluateRegex } = require("../util/invalid-regex-error");

class TextProcessorFluentApi {
  #content;

  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
    const matchPerson =
      /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gim;
    const onlyPerson = this.#content.match(matchPerson);
    this.#content = onlyPerson;
    return this;
  }

  splitTextInColumns() {
    const splitRegex = evaluateRegex(/,/);
    const result = this.#content.map((line) => line.split(splitRegex));
    this.#content = result;

    return this;
  }

  removeEmptyCharacteres() {
    const exp = evaluateRegex(/^\s+|\s+$|\n/g);
    const result = this.#content.map((line) =>
      line.map((line) => line.replace(exp, ""))
    );
    this.#content = result;
    return this;
  }

  mapPerson() {
    const result = this.#content.map((line) => new Person(line));
    this.#content = result;
    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = { TextProcessorFluentApi };
