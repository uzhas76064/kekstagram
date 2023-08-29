const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const isEscPressed = (evt) => {
  return evt.key === 'Escape';
};

const checkStringLength = (string, length) => string.length <= length;

const getRandomArrayElement = (array) =>
  array[getRandomPositiveInteger(0, array.length - 1)];

const isNegative = (value) => {
  return value < 0;
};

export { getRandomPositiveInteger, checkStringLength, getRandomArrayElement, isNegative, isEscPressed };
