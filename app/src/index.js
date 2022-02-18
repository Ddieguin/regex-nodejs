// const wm = new WeakMap();
"use strict";

const { readFile } = require("fs/promises");
const pdf = require("pdf-parse");
const { resolve } = require("path");

(async () => {
  try {
    const dataBuffer = await readFile(
      resolve(__dirname, "..", "..", "docs", "contrato.pdf")
    );
    const data = (await pdf(dataBuffer)).text;
  } catch (err) {
    process.exit(1);
  }
})();
