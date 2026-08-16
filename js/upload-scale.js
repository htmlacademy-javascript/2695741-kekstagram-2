const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleValueElement = document.querySelector('.scale__control--value');
const uploadPreviewImageElement = document.querySelector('.img-upload__preview img');

let currentScale = MAX_SCALE;

const applyUploadScale = () => {
  scaleValueElement.value = `${currentScale}%`;
  uploadPreviewImageElement.style.transform = `scale(${currentScale / 100})`;
};

const resetUploadScale = () => {
  currentScale = MAX_SCALE;
  applyUploadScale();
};

const initUploadScale = () => {
  smallerButtonElement.addEventListener('click', () => {
    currentScale = Math.max(currentScale - SCALE_STEP, MIN_SCALE);
    applyUploadScale();
  });

  biggerButtonElement.addEventListener('click', () => {
    currentScale = Math.min(currentScale + SCALE_STEP, MAX_SCALE);
    applyUploadScale();
  });
};

export {initUploadScale, resetUploadScale};
