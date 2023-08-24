const bigPicture = document.querySelector('.big-picture');
const pictures = document.querySelectorAll('.picture');

pictures.forEach((picture) => {
  picture.addEventListener('click', () => {
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
  });
});
