import {getRandomArray, getRandomPositiveInteger} from "./utils.js";

const MIN_VALUE = 1;
const MAX_VALUE = 25;
const COMMENTS = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const NAMES = ['Данил', 'Андрей', 'Себастьян', 'Паула', 'Георг'];
const PHOTOS_COUNT = 25;

// Генерация не повторяющихся ID с помощью замыкания
const createRandomIdFromGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomPositiveInteger(min, max);

    if (previousValues.length >= (max - min + 1)) {
      console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomPositiveInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  }
}

const generatePhotosObject = () => {
  return {
    id: createRandomIdFromGenerator(MIN_VALUE, MAX_VALUE),
    url: `photos/${createRandomIdFromGenerator(MIN_VALUE, MAX_VALUE)}.jpg`,
    likes: getRandomPositiveInteger(15, 200),

    comments: [
      {
        id: createRandomIdFromGenerator(1, 150),
        avatar: `img/avatar-${createRandomIdFromGenerator(1, 6)}.svg`,
        message: getRandomArray(COMMENTS),
        name: getRandomArray(NAMES)
      }
    ]
  }
}

const createPhotos = () => Array.from({length: PHOTOS_COUNT}, generatePhotosObject);

export {createPhotos};
