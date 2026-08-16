import {loadPictures} from './api.js';
import {initPictureFilters} from './picture-filters.js';
import {drawPictureCards} from './picture-cards.js';
import {showPicturesLoadError} from './messages.js';
import {initUploadEditor} from './upload-editor.js';
import {initUploadEffects} from './upload-effects.js';
import {initUploadScale} from './upload-scale.js';

initUploadScale();
initUploadEffects();
initUploadEditor();

loadPictures()
  .then((pictures) => {
    drawPictureCards(pictures);
    initPictureFilters(pictures);
  })
  .catch(() => {
    showPicturesLoadError();
  });
