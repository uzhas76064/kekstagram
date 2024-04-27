import {createPicture, renderPictures} from './picture.js';
import {fetchPictures} from './server.js';
import {sortPicturesByComments} from './util.js';
import {debounce} from './util.js';

const filterRandom = document.getElementById('filter-random');
const filterDefault = document.getElementById('filter-default');
const filterDiscussed = document.getElementById('filter-discussed');
const container = document.querySelector('.pictures');

const RENDER_DELAY= 500;

const debouncedFetchPictures = debounce(fetchPictures, RENDER_DELAY);

const removePictures = () => {
  Array.from(container.children).forEach((child) => {
    if (child.classList.contains('picture')) {
      container.removeChild(child);
    }
  });
};

const showPictures = (pictures) => {
  removePictures();
  renderPictures(pictures);
};
const showDiscussedPictures = (pictures) => {
  const sortedPictures = pictures.slice().sort(sortPicturesByComments);
  showPictures(sortedPictures);
};

const showRandomPictures = (pictures) => {
  // Перемешиваем массив изображений
  const shuffledPictures = pictures.slice(0, 10).sort(() => Math.random() - 0.5);
  showPictures(shuffledPictures);
};

filterDiscussed.addEventListener('click',() => {
  filterDefault.classList.remove('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  filterDiscussed.classList.add('img-filters__button--active');
  debouncedFetchPictures(showDiscussedPictures);
});

filterRandom.addEventListener('click',() => {
  filterDefault.classList.remove('img-filters__button--active');
  filterRandom.classList.add('img-filters__button--active');
  filterDiscussed.classList.remove('img-filters__button--active');
  debouncedFetchPictures(showRandomPictures);
});

filterDefault.addEventListener('click',() => {
  filterDefault.classList.add('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  filterDiscussed.classList.remove('img-filters__button--active');
  debouncedFetchPictures(showPictures);
});
