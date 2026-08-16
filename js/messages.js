import {isEscEvent} from './utils.js';

const DATA_ERROR_SHOW_TIME = 5000;

const showPicturesLoadError = () => {
  const message = document.querySelector('#data-error').content.querySelector('.data-error').cloneNode(true);

  document.body.append(message);
  setTimeout(() => {
    message.remove();
  }, DATA_ERROR_SHOW_TIME);
};

const showUploadMessage = (templateId) => {
  const message = document.querySelector(`#${templateId}`).content.querySelector(`.${templateId}`).cloneNode(true);
  const inner = message.querySelector(`.${templateId}__inner`);
  const button = message.querySelector(`.${templateId}__button`);

  const closeMessage = () => {
    message.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  function onDocumentKeydown(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeMessage();
    }
  }

  message.addEventListener('click', (evt) => {
    if (!inner.contains(evt.target)) {
      closeMessage();
    }
  });

  button.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.append(message);
};

export {showPicturesLoadError, showUploadMessage};
