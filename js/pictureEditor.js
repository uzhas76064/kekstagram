const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleField = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');

const MAX_SCALE = 100;
const MIN_SCALE = 25;

// Установка значения по умолчанию
scaleField.value = MAX_SCALE;

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 10,
    max: 100
  },
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }

      return value.toFixed(1);
    },
    from: (value) => parseFloat(value),
  },
  connect: 'lower',
  start: 50,
  step: 1
});

const showSlider = (effectName) => {
  imgUploadPreview.classList.add(`effects__preview--${effectName}`);
  imgUploadEffectLevel.style.display = 'block';
};

const changeEffectLevel = (min, max, step, start) => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max
    },
    step: step,
    start: start
  });
};


effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
});

const chooseFilter = (evt) => {
  const target = evt.target;
  imgUploadEffectLevel.style.display = 'none';


  if (evt.target.matches('input[name=effect]')) {
    const selectedTarget =  target.id;

    // Удаление всех классов эффектов
    imgUploadPreview.classList.remove(
      'effects__preview--chrome',
      'effects__preview--sepia',
      'effects__preview--marvin',
      'effects__preview--phobos',
      'effects__preview--heat'
    );


    switch (selectedTarget) {
      case 'effect-none':
        break;
      case 'effect-chrome':
        showSlider('chrome');
        changeEffectLevel(0, 1, 0.1, 1);
        break;
      case 'effect-sepia':
        showSlider('sepia');
        changeEffectLevel(0, 1, 0.1, 1);
        break;
      case 'effect-marvin':
        showSlider('marvin');
        changeEffectLevel(0, 100, 1, 100);

        break;
      case 'effect-phobos':
        showSlider('phobos');
        changeEffectLevel(0, 3, 0.1, 1);
        break;
      case 'effect-heat':
        showSlider('heat');
        break;
    }
  }
};

imgUploadForm.addEventListener('change', chooseFilter);

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
