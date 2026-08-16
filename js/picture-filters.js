import {drawPictureCards} from './picture-cards.js';
import {pickRandomPictures, postponeRender} from './utils.js';

const RANDOM_PICTURES_COUNT = 10;

const filtersElement = document.querySelector('.img-filters');
const filterButtons = filtersElement.querySelectorAll('.img-filters__button');

let loadedPictures = [];

const getFilteredPictures = (filterId) => {
  switch (filterId) {
    case 'filter-random':
      return pickRandomPictures(loadedPictures, RANDOM_PICTURES_COUNT);
    case 'filter-discussed':
      return loadedPictures.slice().sort((firstPicture, secondPicture) => secondPicture.comments.length - firstPicture.comments.length);
    default:
      return loadedPictures;
  }
};

const repaintPictures = postponeRender((filterId) => {
  drawPictureCards(getFilteredPictures(filterId));
});

const setActiveFilter = (targetButton) => {
  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });

  targetButton.classList.add('img-filters__button--active');
};

const initPictureFilters = (pictures) => {
  loadedPictures = pictures;
  filtersElement.classList.remove('img-filters--inactive');

  filtersElement.addEventListener('click', (evt) => {
    const targetButton = evt.target.closest('.img-filters__button');

    if (!targetButton || targetButton.classList.contains('img-filters__button--active')) {
      return;
    }

    setActiveFilter(targetButton);
    repaintPictures(targetButton.id);
  });
};

export {initPictureFilters};
