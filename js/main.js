import {loadPictures} from './api.js';
import {drawPictureCards} from './picture-cards.js';
import {showPicturesLoadError} from './messages.js';

loadPictures()
  .then((pictures) => {
    drawPictureCards(pictures);
  })
  .catch(() => {
    showPicturesLoadError();
  });
