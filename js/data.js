import {getRandomArray, getRandomPositiveInteger, createRandomIdFromRangeGenerator} from './utils.js';

const MIN_ID_VALUE = 1;
const MAX_ID_VALUE = 50;
const URL_PHOTO_COUNT = 25;
const COMMENTS = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const NAMES = ['Данил', 'Андрей', 'Себастьян', 'Паула', 'Георг'];
const PHOTOS_COUNT = 25;

const generatedPhotoId = createRandomIdFromRangeGenerator(MIN_ID_VALUE, MAX_ID_VALUE);
const generatePhotosObject = () => ({
  id: generatedPhotoId(),
  url: `photos/${getRandomPositiveInteger(1, URL_PHOTO_COUNT)}.jpg`,
  likes: getRandomPositiveInteger(15, 200),

  comments: [
    {
      id: getRandomPositiveInteger(MIN_ID_VALUE, MAX_ID_VALUE),
      avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
      message: getRandomArray(COMMENTS),
      name: getRandomArray(NAMES)
    }
  ]
});
const createPhotos = () => Array.from({length: PHOTOS_COUNT}, generatePhotosObject);

export {createPhotos};
