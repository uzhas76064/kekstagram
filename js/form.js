import {resetFilter, resetScale} from './pictureEditor.js';

const form = document.querySelector('.img-upload__form'); // Получаем форму для загрузки изображения
const overlay = document.querySelector('.img-upload__overlay'); // Получаем оверлей для модального окна
const body = document.querySelector('body'); // Получаем тело документа
const cancelButton = document.querySelector('#upload-cancel'); // Получаем кнопку отмены
const fileField = document.querySelector('#upload-file'); // Получаем поле для выбора файла
const hashtagField = document.querySelector('.text__hashtags'); // Получаем поле для хэштегов
const commentField = document.querySelector('.text__description'); // Получаем поле для комментариев
const successMessage = document.getElementById('success');
const successSection = successMessage.content.firstElementChild.cloneNode(true);
const successButton = successSection.querySelector('.success__button');
const errorMessage = document.getElementById('error');
const errorSection = errorMessage.content.firstElementChild.cloneNode(true);
const errorButton = errorSection.querySelector('.error__button');


const MAX_HASHTAG_COUNT = 5; // Максимальное количество хэштегов
const MIN_HASHTAG_LENGTH = 2; // Минимальная длина хэштега
const MAX_HASHTAG_LENGTH = 20; // Максимальная длина хэштега
const INVALID_SYMBOLS = /[^a-zA-Z0-9а-яА-ЯёЁ]/g; // Регулярное выражение для поиска недопустимых символов в хэштегах
const POST_PICTURES_URL = 'https://25.javascript.htmlacademy.pro/kekstagram'; // URL для отправки изображений

successButton.addEventListener('click', () =>{
  successSection.classList.add('hidden');
});

errorSection.addEventListener('click', (evt) => {
  if (evt.target.className !== 'error__inner') {
    errorSection.classList.add('hidden');
  }
});

successSection.addEventListener('click', (evt) => {
  if (evt.target.className !== 'success__inner') {
    successSection.classList.add('hidden');
  }
});

// Функция вывода сообщения об успешной отправки
const showSuccessMessage = () => {
  successSection.classList.remove('hidden');
  body.appendChild(successSection);
};

const showErrorMessage = () => {
  body.appendChild(errorSection);
};

// Создание экземпляра Pristine для валидации формы
const pristine = new Pristine(form, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error',
});

// Функция для отображения модального окна
const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
};

// Функция для сброса параметров формы
const resetFormParams = () => {
  form.reset();
  pristine.reset();
  resetScale(document.querySelector('.img-upload__preview img'));
  resetFilter(document.querySelector('.img-upload__preview img'));
  overlay.classList.add('hidden');
  showSuccessMessage();
};

// Функция для скрытия модального окна
const hideModal = () => {
  form.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
};

// Функция для проверки, находится ли фокус в текстовом поле
const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

// Обработчик нажатия клавиши Esc
function onEscKeyDown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

// Обработчик нажатия кнопки отмены
const onCancelButtonClick = () => {
  hideModal();
};

// Обработчик изменения выбранного файла
const onFileInputChange = () => {
  showModal();
};

// Функция для проверки, начинается ли строка с символа #
const startsWithHash = (string) => string[0] === '#';

// Функция для проверки длины хэштега
const hasValidLength = (string) =>
  string.length >= MIN_HASHTAG_LENGTH && string.length <= MAX_HASHTAG_LENGTH;

// Функция для проверки допустимых символов в хэштеге
const hasValidSymbols = (string) => !INVALID_SYMBOLS.test(string.slice(1));

// Функция для проверки валидности хэштега
const isValidTag = (tag) =>
  startsWithHash(tag) && hasValidLength(tag) && hasValidSymbols(tag);

// Функция для проверки количества хэштегов
const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

// Функция для проверки уникальности хэштегов
const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

// Функция для валидации хэштегов
const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

// Добавление валидатора для поля ввода хэштегов
pristine.addValidator(
  hashtagField,
  validateTags,
  'Неправильно заполнены хэштеги'
);

// Добавление слушателей событий
fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
// form.addEventListener('submit', onFormSubmit);

// Функция для установки обработчика отправки формы пользователя
const setUserFormSubmit = (onsuccess, onerror) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if(isValid) {
      const formData = new FormData(evt.target);
      fetch(POST_PICTURES_URL,
        {
          method: 'POST',
          credentials:'same-origin',
          body: formData
        })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(() => onsuccess())
        .catch(() => {
          showErrorMessage();
        });
    }
  });
};

// Экспорт функций
export {setUserFormSubmit, resetFormParams, showErrorMessage};
