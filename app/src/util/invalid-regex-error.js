"use strict";
const safeRegex = require("safe-regex");

class InvalidRegexError extends Error {
  constructor(exp) {
    super(`this ${exp} is unsafe dude`);
    this.name = "invalidRegexError";
  }
}

const evaluateRegex = (exp) => {
  const isSafe = safeRegex(exp);
  if (!isSafe) throw new InvalidRegexError(exp);
  return exp;
};

module.exports = {
  InvalidRegexError,
  evaluateRegex,
};
