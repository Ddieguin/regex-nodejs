"use strict";
const { TextProcessorFluentApi } = require("./lib/text-processor-fluent-api");

class TextProcessorFacade {
  #textProcessorFluentApi;

  constructor(text) {
    this.#textProcessorFluentApi = new TextProcessorFluentApi(text);
  }

  getPeopleFromPdf() {
    return this.#textProcessorFluentApi
      .extractPeopleData()
      .splitTextInColumns()
      .removeEmptyCharacteres()
      .mapPerson()
      .build();
  }
}

module.exports = { TextProcessorFacade };
