import {createPhotos} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const pictureFragment = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderPictureMiniature = () => {
  const photos = createPhotos();

  photos.forEach((photo) => {
    const photoElement = pictureFragment.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    picturesContainer.appendChild(photoElement);
  });
};

renderPictureMiniature();
