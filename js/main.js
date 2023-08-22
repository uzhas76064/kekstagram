// Генерация рандомного целого числа в диапозоне от a до b
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

// Проверка строки на максимальную длину
function checkStringLength (string, maxLength) {
  return string.length <= maxLength;
}
