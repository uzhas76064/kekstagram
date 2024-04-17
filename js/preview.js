const fileChooser = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');

const FILE_TYPES = ['png','jpg', 'jpeg'];

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  console.log(file);
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((elem) => {
    return fileName.endsWith(elem);
  });

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});
