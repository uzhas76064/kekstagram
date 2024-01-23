const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleField = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');

const MAX_SCALE = 100;
const MIN_SCALE = 25;

// Установка значения по умолчанию
scaleField.value = MAX_SCALE;

const scaleUploadingImg = (img, scaleValue) => {
  if (scaleValue === MAX_SCALE) {
    img.style.transform = 'scale(1)';
  } else {
    img.style.transform = `scale(0.${scaleValue})`;
  }

};

smallerButton.addEventListener('click', () => {
  let currentValue = parseInt(scaleField.value, 10);

  // Уменьшение значения с шагом 25, но не ниже MIN_SCALE
  currentValue = Math.max(currentValue - 25, MIN_SCALE);

  scaleField.value = currentValue;

  scaleUploadingImg(imgUploadPreview, currentValue);
});

biggerButton.addEventListener('click', () => {
  let currentValue = parseInt(scaleField.value, 10);

  // Увеличение значения с шагом 25, но не выше MAX_SCALE
  currentValue = Math.min(currentValue + 25, MAX_SCALE);

  scaleField.value = currentValue;

  scaleUploadingImg(imgUploadPreview, currentValue);
});
