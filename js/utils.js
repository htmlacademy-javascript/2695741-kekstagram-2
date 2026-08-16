const isEscEvent = (evt) => evt.key === 'Escape';

const postponeRender = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const pickRandomPictures = (items, count) => items
  .slice()
  .sort(() => Math.random() - 0.5)
  .slice(0, count);

export {isEscEvent, postponeRender, pickRandomPictures};
