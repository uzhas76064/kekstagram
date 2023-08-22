import {getRandomArray, getRandomPositiveInteger} from "./utils.js";

// Генерация объекта фото
const MIN_VALUE = 1;
const MAX_VALUE = 25;
const COMMENTS = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const NAMES = ['Данил', 'Андрей', 'Себастьян', 'Паула', 'Георг'];



const generatePhotosObject = () => {
  return {
    id: getRandomPositiveInteger(MIN_VALUE, MAX_VALUE),
    url: `photos/${getRandomPositiveInteger(MIN_VALUE, MAX_VALUE)}.jpg`,
    likes: getRandomPositiveInteger(15, 200),

    comments: [
      {
        id: getRandomPositiveInteger(1, 150),
        avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
        message: getRandomArray(COMMENTS),
        name: getRandomArray(NAMES)
      }
    ]
  }
}

const createPhotos = () => Array.from({length: 25}, generatePhotosObject);

export {createPhotos};
