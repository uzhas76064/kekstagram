import { showBigPicture } from './big-picture.js'; // Импорт функции для отображения большого изображения

// Получаем шаблон элемента изображения и контейнер для отображения списка изображений
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

// Функция для создания DOM-элемента изображения на основе данных
const createPicture = (data) => {
  const { comments, description, likes, url } = data;
  const picture = pictureTemplate.cloneNode(true);

  // Заполнение данными изображения
  picture.querySelector('.picture__img').src = url; // Установка источника изображения
  picture.querySelector('.picture__img').alt = description; // Установка атрибута alt изображения
  picture.querySelector('.picture__comments').textContent = comments.length; // Установка количества комментариев
  picture.querySelector('.picture__likes').textContent = likes; // Установка количества лайков

  // Добавление слушателя события для отображения большого изображения при клике на миниатюру
  picture.addEventListener('click', () => {
    showBigPicture(data); // Вызов функции для отображения большого изображения с передачей данных
  });

  return picture; // Возвращаем созданный элемент изображения
};

// Функция для отрисовки списка изображений на странице
const renderPictures = (pictures) => {
  const fragment = document.createDocumentFragment(); // Создаем фрагмент для эффективного добавления элементов в DOM
  pictures.forEach((picture) => {
    const pictureElement = createPicture(picture); // Создаем DOM-элемент изображения на основе данных
    fragment.append(pictureElement); // Добавляем элемент изображения во фрагмент
  });

  container.append(fragment); // Добавляем фрагмент с элементами изображений в контейнер на странице
};

export { renderPictures }; // Экспорт функции для отрисовки списка изображений
