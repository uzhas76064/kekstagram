// Проверка строки на максимальную длину
// eslint-disable-next-line no-unused-vars
function checkStringLength (string, maxLength) {
  return string.length <= maxLength;
}

// Генерация рандомного целого числа в диапозоне от a до b
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomPositiveInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error(`Перебраны все числа из диапазона от ${  min  } до ${  max}`);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomPositiveInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const getRandomArray = (arr) => arr[getRandomPositiveInteger(1, arr.length - 1)];

export {getRandomArray, getRandomPositiveInteger, createRandomIdFromRangeGenerator};
