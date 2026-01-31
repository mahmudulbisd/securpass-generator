
interface Options {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
};

/**
 * Generates a random integer between 0 and max (exclusive) 
 * using cryptographically secure random values.
 */
const getRandomInt = (max: number): number => {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] % max;
};

/**
 * Shuffles an array in place.
 */
const shuffle = <T,>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomInt(i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const generateSecurePassword = (length: number, options: Options): string => {
  let characterPool = '';
  const passwordArray: string[] = [];

  // Guaranteed characters: Ensure at least one from each selected set
  if (options.uppercase) {
    characterPool += CHAR_SETS.uppercase;
    passwordArray.push(CHAR_SETS.uppercase[getRandomInt(CHAR_SETS.uppercase.length)]);
  }
  if (options.lowercase) {
    characterPool += CHAR_SETS.lowercase;
    passwordArray.push(CHAR_SETS.lowercase[getRandomInt(CHAR_SETS.lowercase.length)]);
  }
  if (options.numbers) {
    characterPool += CHAR_SETS.numbers;
    passwordArray.push(CHAR_SETS.numbers[getRandomInt(CHAR_SETS.numbers.length)]);
  }
  if (options.symbols) {
    characterPool += CHAR_SETS.symbols;
    passwordArray.push(CHAR_SETS.symbols[getRandomInt(CHAR_SETS.symbols.length)]);
  }

  // If for some reason characterPool is empty (validation should prevent this)
  if (!characterPool) return '';

  // Fill the rest of the length
  const remainingLength = length - passwordArray.length;
  for (let i = 0; i < remainingLength; i++) {
    passwordArray.push(characterPool[getRandomInt(characterPool.length)]);
  }

  // Final shuffle to ensure the "guaranteed" chars aren't always at the start
  return shuffle(passwordArray).join('');
};
