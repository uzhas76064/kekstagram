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
        message: COMMENTS[getRandomPositiveInteger(1, COMMENTS.length - 1)],
        name: NAMES[getRandomPositiveInteger(1, NAMES.length - 1)]
      }
    ]
  }
}

const otherPhotos = Array.from({length: 25}, generatePhotosObject);
console.log(otherPhotos)
