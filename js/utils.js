function getRandomPositiveInteger(min = 0, max = 0) {
  if((min < 0) || (max < 0)) {
    return;
  }
  if(min > max) {
    const temp = min;
    min = max;
    max = temp;
  }
  if(!min && !max) {
    return Math.floor(Math.random()*1000000);
  }
  if(!min || !max) {
    if(min) {
      return Math.floor(Math.random() * min);
    }
    if(max) {
      return Math.floor(Math.random() * max);
    }
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomArrayElement = (elements) => (elements[getRandomPositiveInteger(0,elements.length - 1)]);

export {getRandomArrayElement, getRandomPositiveInteger};
