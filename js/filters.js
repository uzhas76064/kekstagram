import {createPicture} from './picture.js';
import {fetchPictures} from './server.js';
import {sortPicturesByComments} from './util.js';
import {debounce} from './util.js';

const filterRandom = document.getElementById('filter-random');
const filterDefault = document.getElementById('filter-default');
const filterDiscussed = document.getElementById('filter-discussed');
const container = document.querySelector('.pictures');

const RENDER_DELAY= 500;

const removePictures = () => {
  Array.from(container.children).forEach((child) => {
    if (child.classList.contains('picture')) {
      container.removeChild(child);
    }
  });
};
const showDiscussedPictures = (pictures) => {
  const fragment = document.createDocumentFragment(); // Создаем фрагмент для эффективного добавления элементов в DOM
  const sortedPictures = pictures.slice().sort(sortPicturesByComments);
  sortedPictures.forEach((picture) => {
    const pictureElement = createPicture(picture); // Создаем DOM-элемент изображения на основе данных
    fragment.append(pictureElement); // Добавляем элемент изображения во фрагмент
  });
  removePictures();

  container.append(fragment); // Добавляем фрагмент с элементами изображений в контейнер на странице
};

const showRandomPictures = (pictures) => {
  // Перемешиваем массив изображений
  const shuffledPictures = pictures.slice(0, 10).sort(() => Math.random() - 0.5);

  const fragment = document.createDocumentFragment(); // Создаем фрагмент для эффективного добавления элементов в DOM
  shuffledPictures.forEach((picture) => {
    const pictureElement = createPicture(picture); // Создаем DOM-элемент изображения на основе данных
    fragment.append(pictureElement); // Добавляем элемент изображения во фрагмент
  });
  // Удаляем только дочерние элементы контейнера, которые представляют изображения
  removePictures();

  container.append(fragment); // Добавляем фрагмент с элементами изображений в контейнер на странице
};

const showDefaultPictures = (pictures) => {
  const fragment = document.createDocumentFragment(); // Создаем фрагмент для эффективного добавления элементов в DOM
  pictures.forEach((picture) => {
    const pictureElement = createPicture(picture); // Создаем DOM-элемент изображения на основе данных
    fragment.append(pictureElement); // Добавляем элемент изображения во фрагмент
  });
  removePictures();

  container.append(fragment); // Добавляем фрагмент с элементами изображений в контейнер на странице
};

filterDiscussed.addEventListener('click', () => {
  filterDefault.classList.remove('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  filterDiscussed.classList.add('img-filters__button--active');
  fetchPictures(showDiscussedPictures);
});

filterRandom.addEventListener('click', () => {
  filterDefault.classList.remove('img-filters__button--active');
  filterRandom.classList.add('img-filters__button--active');
  filterDiscussed.classList.remove('img-filters__button--active');
  fetchPictures(showRandomPictures);
});

filterDefault.addEventListener('click', () => {
  filterDefault.classList.add('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  filterDiscussed.classList.remove('img-filters__button--active');
  fetchPictures(showDefaultPictures);
});
