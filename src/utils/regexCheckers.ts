export function includeLetters(password: string) {
  const hasLetters = /[a-zA-Z]+/.test(password);
  return hasLetters;
}

export function includeNumbers(password: string) {
  const hasNumbers = /[0-9]+/.test(password);
  return hasNumbers;
}

export function includeWhitespace(password: string) {
  const hasWhiteSpace = /\s/g.test(password);
  return hasWhiteSpace;
}

export function includeSymbols(password: string) {
  const hasSymbols = /[\$-/:-?}{-|~!;'&*+=<>,%"^#_@`\[\]]/g.test(password);
  return hasSymbols;
}
