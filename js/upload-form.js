import {uploadPicture} from './api.js';
import {showUploadMessage} from './messages.js';
import {closeUploadEditor} from './upload-editor.js';

const MAX_HASHTAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_PATTERN = /^#[\p{L}\p{N}]{1,19}$/u;

const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagsElement = uploadFormElement.querySelector('.text__hashtags');
const descriptionElement = uploadFormElement.querySelector('.text__description');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const getHashtags = (value) => value.trim().split(/\s+/).filter(Boolean);

const hasValidHashtags = (value) => getHashtags(value).every((hashtag) => HASHTAG_PATTERN.test(hashtag));

const hasAvailableHashtagsCount = (value) => getHashtags(value).length <= MAX_HASHTAGS_COUNT;

const hasUniqueHashtags = (value) => {
  const hashtags = getHashtags(value).map((hashtag) => hashtag.toLowerCase());

  return hashtags.length === new Set(hashtags).size;
};

const hasValidCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;

const blockUploadSubmit = () => {
  submitButtonElement.disabled = true;
};

const unblockUploadSubmit = () => {
  submitButtonElement.disabled = false;
};

const initUploadForm = () => {
  pristine.addValidator(hashtagsElement, hasValidHashtags, 'Неправильный хэштег', 3, true);
  pristine.addValidator(hashtagsElement, hasAvailableHashtagsCount, 'Не больше пяти хэштегов', 2, true);
  pristine.addValidator(hashtagsElement, hasUniqueHashtags, 'Хэштеги не должны повторяться', 1, true);
  pristine.addValidator(descriptionElement, hasValidCommentLength, 'Комментарий не длиннее 140 символов');

  uploadFormElement.addEventListener('upload-editor-reset', () => {
    pristine.reset();
    unblockUploadSubmit();
  });

  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (!pristine.validate()) {
      return;
    }

    blockUploadSubmit();

    uploadPicture(new FormData(uploadFormElement))
      .then(() => {
        closeUploadEditor();
        showUploadMessage('success');
      })
      .catch(() => {
        showUploadMessage('error');
      })
      .finally(() => {
        unblockUploadSubmit();
      });
  });
};

export {initUploadForm};
