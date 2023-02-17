const LEVELS = ['letters', 'numbers', 'symbols'];
const MESSAGES = [
  'Password is easy.',
  'Password is medium.',
  'Password is strong.',
  'Whitespaces are not allowed.',
  'Password must be at least 10 characters.',
];

interface INotification {
  levels?: boolean[];
  message?: number;
}
// func generates a notification to user depending on a password strength
export function showNotification(inputs: INotification): string {
  let message = '';
  if (inputs.message) {
    message = MESSAGES[inputs.message];
  }
  if (inputs.levels) {
    const { hint, strengthLevel } = getHint(inputs.levels);
    message = `${MESSAGES[strengthLevel]} ${hint}`;
  }

  return message;
}
// func analizes which type of character is missing and indicates to user
function getHint(levels: boolean[]) {
  let keyHints = [];
  let strengthLevel = -1;

  for (let i = 0; i < levels.length; i++) {
    levels[i] ? (strengthLevel += 1) : keyHints.push(LEVELS[i]);
  }
  if (strengthLevel === 2) {
    return { strengthLevel, hint: '' };
  }
  const hint = `Please add ${keyHints.join(', ')}.`;
  console.log('hint', hint);
  return { hint, strengthLevel };
}
