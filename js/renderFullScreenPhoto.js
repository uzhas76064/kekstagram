const bigPicture = document.querySelector('.big-picture');
const pictures = document.querySelectorAll('.picture');
const pictureClose = bigPicture.querySelector('.cancel');

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
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
  });
});


