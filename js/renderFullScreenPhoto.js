
const bigPicture = document.querySelector('.big-picture');
const pictures = document.querySelectorAll('.picture');
const pictureClose = bigPicture.querySelector('.cancel');

const showBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

document.addEventListener('keydown', (e) => {
  e.preventDefault();

  if (e.key === 'Escape') {
    hideBigPicture();
  }
});

pictureClose.addEventListener('click', (e) => {
  e.preventDefault();
  hideBigPicture();
});

pictures.forEach((picture) => {
  picture.addEventListener('click', () => {
    showBigPicture();

    const pictureImg = picture.querySelector('.picture__img').src;
    const  pictureLikes = picture.querySelector('.picture__likes').textContent;
    const pictureComments = picture.querySelector('.picture__comments').textContent;

    bigPicture.querySelector('.big-picture__img img').src = pictureImg;
    bigPicture.querySelector('.likes-count').textContent = pictureLikes;
    bigPicture.querySelector('.comments-count').textContent = pictureComments;
  });
});


