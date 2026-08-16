import {isEscEvent} from './utils.js';
import {resetUploadEffect} from './upload-effects.js';
import {resetUploadScale} from './upload-scale.js';

const DEFAULT_PREVIEW = 'img/upload-default-image.jpg';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFileElement = document.querySelector('.img-upload__input');
const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const uploadCancelElement = document.querySelector('.img-upload__cancel');
const uploadPreviewImageElement = document.querySelector('.img-upload__preview img');
const effectPreviewElements = document.querySelectorAll('.effects__preview');
const hashtagsElement = document.querySelector('.text__hashtags');
const descriptionElement = document.querySelector('.text__description');

let previewUrl;

const isTextFieldFocused = () => document.activeElement === hashtagsElement || document.activeElement === descriptionElement;

const isUploadMessageOpened = () => Boolean(document.querySelector('.error, .success'));

const setPreviewImage = (src) => {
  uploadPreviewImageElement.src = src;
  effectPreviewElements.forEach((preview) => {
    preview.style.backgroundImage = `url(${src})`;
  });
};

const clearPreviewUrl = () => {
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
    previewUrl = '';
  }
};

const resetUploadEditor = () => {
  uploadFormElement.reset();
  uploadFileElement.value = '';
  resetUploadScale();
  resetUploadEffect();
  clearPreviewUrl();
  setPreviewImage(DEFAULT_PREVIEW);
  uploadFormElement.dispatchEvent(new Event('upload-editor-reset'));
};

const closeUploadEditor = () => {
  uploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetUploadEditor();
};

function onDocumentKeydown(evt) {
  if (isEscEvent(evt) && !isTextFieldFocused() && !isUploadMessageOpened()) {
    evt.preventDefault();
    closeUploadEditor();
  }
}

const openUploadEditor = () => {
  uploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const showSelectedPicture = () => {
  const file = uploadFileElement.files[0];

  if (!file) {
    return;
  }

  const fileName = file.name.toLowerCase();
  const isValidFile = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (!isValidFile) {
    return;
  }

  clearPreviewUrl();
  previewUrl = URL.createObjectURL(file);
  setPreviewImage(previewUrl);
};

const initUploadEditor = () => {
  uploadFileElement.addEventListener('change', () => {
    showSelectedPicture();
    openUploadEditor();
  });

  uploadCancelElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeUploadEditor();
  });
};

export {closeUploadEditor, initUploadEditor, resetUploadEditor};
