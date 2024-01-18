import {isNegative} from './utils.js';

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadFileInput = document.querySelector('#upload-file');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const uploadCancel = document.querySelector('#upload-cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const imgUploadForm = document.querySelector('.img-upload__form');

const INVALID_HASHTAG_SYMBOLS = /[^a-zA-Z0-9а-яА-ЯёЁ]/g;
const MAX_HASHTAG_LENGTH = 20;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_COUNT = 5;

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error',
});

const startsWithHash = (string) => string[0] === '#';

const hasValidLength = (string) =>
  string.length >= MIN_HASHTAG_LENGTH && string.length <= MAX_HASHTAG_LENGTH;

const hasValidSymbols = (string) => !INVALID_HASHTAG_SYMBOLS.test(string.slice(1));

const isValidTag = (tag) =>
  startsWithHash(tag) && hasValidLength(tag) && hasValidSymbols(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  hashtagInput,
  validateTags,
  'Неправильно заполнены хэштеги'
);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

const onScaleControlSmaller = () => {
  scaleControlValue.value--;
  if (isNegative(scaleControlValue.value)) {
    scaleControlValue.value = 0;
  }
};

const onScaleControlBigger = () => {
  scaleControlValue.value++;
  if (scaleControlValue.value >= 100) {
    scaleControlValue.value = 100;
  }
};

const onEscKeyDown = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

uploadFileInput.addEventListener('change', (evt) => {
  console.log(uploadFileInput.value);
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  scaleControlSmaller.addEventListener('click', onScaleControlSmaller);
  scaleControlBigger.addEventListener('click', onScaleControlBigger);

  if (evt.key === 'Escape') {
    document.addEventListener('keydown', onEscKeyDown);
  }
});

uploadCancel.addEventListener('click', () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  scaleControlValue.value = '';

  document.removeEventListener('keydown', onEscKeyDown);
  document.removeEventListener('click', onScaleControlSmaller);
  document.removeEventListener('click', onScaleControlBigger);
});

imgUploadForm.addEventListener('submit', onFormSubmit);
