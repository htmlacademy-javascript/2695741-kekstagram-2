import {loadPictures} from './api.js';
import {initPictureFilters} from './picture-filters.js';
import {drawPictureCards} from './picture-cards.js';
import {showPicturesLoadError} from './messages.js';

loadPictures()
  .then((pictures) => {
    drawPictureCards(pictures);
    initPictureFilters(pictures);
  })
  .catch(() => {
    showPicturesLoadError();
  });
