import {openBigPicture} from './big-picture.js';

const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const clearPictureCards = () => {
  picturesContainerElement.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });
};

const makePictureCard = (picture) => {
  const pictureElement = pictureTemplateElement.cloneNode(true);
  const imageElement = pictureElement.querySelector('.picture__img');

  imageElement.src = picture.url;
  imageElement.alt = picture.description;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(picture);
  });

  return pictureElement;
};

const drawPictureCards = (pictures) => {
  const picturesFragment = document.createDocumentFragment();

  clearPictureCards();
  pictures.forEach((picture) => {
    picturesFragment.append(makePictureCard(picture));
  });
  picturesContainerElement.append(picturesFragment);
};

export {drawPictureCards};
