// Получаем кнопки уменьшения и увеличения масштаба, поле для отображения масштаба,
// превью изображения, слайдер уровня эффекта, поле для отображения значения уровня эффекта,
// форму загрузки изображения и контейнер уровня эффекта
const smallerButton = document.querySelector('.scale__control--smaller'); // Получаем кнопку уменьшения масштаба
const biggerButton = document.querySelector('.scale__control--bigger'); // Получаем кнопку увеличения масштаба
const scaleField = document.querySelector('.scale__control--value'); // Получаем поле для отображения масштаба
const imgUploadPreview = document.querySelector('.img-upload__preview img'); // Получаем превью изображения
const effectLevelSlider = document.querySelector('.effect-level__slider'); // Получаем слайдер уровня эффекта
const effectLevelValue = document.querySelector('.effect-level__value'); // Получаем поле для отображения значения уровня эффекта
const imgUploadForm = document.querySelector('.img-upload__form'); // Получаем форму загрузки изображения
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level'); // Получаем контейнер уровня эффекта

const MAX_SCALE = 100; // Максимальное значение масштаба
const MIN_SCALE = 25; // Минимальное значение масштаба

// Устанавливаем значение масштаба по умолчанию
scaleField.value = MAX_SCALE;

// Инициализация слайдера уровня эффекта
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

// Функция для отображения слайдера уровня эффекта
const showSlider = (effectName) => {
  imgUploadPreview.classList.add(`effects__preview--${effectName}`);
  imgUploadEffectLevel.style.display = 'block';
};

// Функция для изменения уровня эффекта
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

// Обновление значения уровня эффекта при изменении ползунка
effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
});

// Обновление значения уровня эффекта и применение выбранного эффекта к превью изображения
effectLevelSlider.noUiSlider.on('update', (values, handle) => {
  effectLevelValue.value = values[handle];

  const selectedEffect = document.querySelector('input[name="effect"]:checked').id;

  switch (selectedEffect) {
    case 'effect-chrome':
      imgUploadPreview.style.filter = `grayscale(${effectLevelValue.value})`;
      break;
    case 'effect-sepia':
      imgUploadPreview.style.filter = `sepia(${effectLevelValue.value})`;
      break;
    case 'effect-marvin':
      imgUploadPreview.style.filter = `invert(${effectLevelValue.value}%)`;
      break;
    case 'effect-phobos':
      imgUploadPreview.style.filter = `blur(${effectLevelValue.value}px)`;
      break;
    case 'effect-heat':
      imgUploadPreview.style.filter = `brightness(${effectLevelValue.value})`;
      break;
  }
});

// Функция выбора эффекта
const chooseFilter = (evt) => {
  const target = evt.target;
  imgUploadEffectLevel.style.display = 'none';

  imgUploadPreview.style.filter = ''; // Сброс фильтра перед применением нового эффекта

  if (evt.target.matches('input[name=effect]')) {
    const selectedTarget = target.id;

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
        imgUploadPreview.style.filter = ''; // Сброс фильтра
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

// Слушатель изменения выбранного эффекта
imgUploadForm.addEventListener('change', chooseFilter);

// Функция для изменения масштаба загружаемого изображения
const scaleUploadingImg = (img, scaleValue) => {
  if (scaleValue === MAX_SCALE) {
    img.style.transform = 'scale(1)';
  } else {
    img.style.transform = `scale(0.${scaleValue})`;
  }
};

// Слушатель для кнопки уменьшения масштаба
smallerButton.addEventListener('click', () => {
  let currentValue = parseInt(scaleField.value, 10);

  // Уменьшение значения с шагом 25, но не ниже MIN_SCALE
  currentValue = Math.max(currentValue - 25, MIN_SCALE);

  scaleField.value = currentValue;

  scaleUploadingImg(imgUploadPreview, currentValue);
});

// Слушатель для кнопки увеличения масштаба
biggerButton.addEventListener('click', () => {
  let currentValue = parseInt(scaleField.value, 10);

  // Увеличение значения с шагом 25, но не выше MAX_SCALE
  currentValue = Math.min(currentValue + 25, MAX_SCALE);

  scaleField.value = currentValue;

  scaleUploadingImg(imgUploadPreview, currentValue);
});

// Функция для сброса масштаба изображения
const resetScale = (img) => {
  img.style.transform = 'scale(1)';
};

// Функция для сброса фильтра изображения
const resetFilter = (img, removingFilter) => {
  img.removeAttribute('class');
};

// Экспорт функций
export {resetScale, resetFilter};
