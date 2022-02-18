"use strict";

// const wm = new WeakMap();
const { readFile } = require("fs/promises");
const pdf = require("pdf-parse");
const { resolve } = require("path");
const { TextProcessorFacade } = require("./text-processor-facade");

(async () => {
  try {
    const dataBuffer = await readFile(
      resolve(__dirname, "..", "..", "docs", "contrato.pdf")
    );
    const data = await pdf(dataBuffer);
    const instance = new TextProcessorFacade(data.text);
    const peoples = instance.getPeopleFromPdf();
    console.log(peoples);
  } catch (err) {
    process.exit(1);
  }
})();
