const DEFAULT_EFFECT = 'none';

const effectSettings = {
  chrome: {
    range: {min: 0, max: 1},
    start: 1,
    step: 0.1,
    filter: (value) => `grayscale(${value})`,
  },
  sepia: {
    range: {min: 0, max: 1},
    start: 1,
    step: 0.1,
    filter: (value) => `sepia(${value})`,
  },
  marvin: {
    range: {min: 0, max: 100},
    start: 100,
    step: 1,
    filter: (value) => `invert(${value}%)`,
  },
  phobos: {
    range: {min: 0, max: 3},
    start: 3,
    step: 0.1,
    filter: (value) => `blur(${value}px)`,
  },
  heat: {
    range: {min: 1, max: 3},
    start: 3,
    step: 0.1,
    filter: (value) => `brightness(${value})`,
  },
};

const uploadPreviewImageElement = document.querySelector('.img-upload__preview img');
const effectsListElement = document.querySelector('.effects__list');
const effectLevelElement = document.querySelector('.img-upload__effect-level');
const effectSliderElement = document.querySelector('.effect-level__slider');
const effectValueElement = document.querySelector('.effect-level__value');

let currentEffect = DEFAULT_EFFECT;

const hideEffectSlider = () => {
  effectLevelElement.classList.add('hidden');
};

const showEffectSlider = () => {
  effectLevelElement.classList.remove('hidden');
};

const setOriginalEffect = () => {
  currentEffect = DEFAULT_EFFECT;
  uploadPreviewImageElement.style.filter = '';
  effectValueElement.value = '';
  hideEffectSlider();
};

const updateEffectSlider = ({range, start, step}) => {
  effectSliderElement.noUiSlider.updateOptions({
    range,
    start,
    step,
  });
};

const setUploadEffect = (effectName) => {
  if (effectName === DEFAULT_EFFECT) {
    setOriginalEffect();
    return;
  }

  currentEffect = effectName;
  updateEffectSlider(effectSettings[effectName]);
  showEffectSlider();
};

const resetUploadEffect = () => {
  document.querySelector('#effect-none').checked = true;
  setOriginalEffect();
};

const initUploadEffects = () => {
  noUiSlider.create(effectSliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  });

  effectSliderElement.noUiSlider.on('update', () => {
    if (currentEffect === DEFAULT_EFFECT) {
      return;
    }

    const value = Number(effectSliderElement.noUiSlider.get());

    effectValueElement.value = value;
    uploadPreviewImageElement.style.filter = effectSettings[currentEffect].filter(value);
  });

  effectsListElement.addEventListener('change', (evt) => {
    setUploadEffect(evt.target.value);
  });

  resetUploadEffect();
};

export {initUploadEffects, resetUploadEffect};
