import {renderPictures} from './picture.js';

const PICTURES_URL = 'https://25.javascript.htmlacademy.pro/kekstagram/data';

const fetchPictures = () => {
  fetch(PICTURES_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      renderPictures(data);
    })
    .then(() => {
      document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export {fetchPictures};
