import {isEscEvent} from './utils.js';

const COMMENTS_STEP = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImage = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const captionElement = bigPictureElement.querySelector('.social__caption');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const shownCommentsCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const totalCommentsCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

let currentComments = [];
let shownCommentsCount = 0;

const makeCommentElement = ({avatar, message, name}) => {
  const commentElement = document.createElement('li');
  const avatarElement = document.createElement('img');
  const textElement = document.createElement('p');

  commentElement.classList.add('social__comment');
  avatarElement.classList.add('social__picture');
  avatarElement.src = avatar;
  avatarElement.alt = name;
  avatarElement.width = 35;
  avatarElement.height = 35;
  textElement.classList.add('social__text');
  textElement.textContent = message;

  commentElement.append(avatarElement, textElement);

  return commentElement;
};

const drawNextComments = () => {
  const commentsFragment = document.createDocumentFragment();
  const nextComments = currentComments.slice(shownCommentsCount, shownCommentsCount + COMMENTS_STEP);

  nextComments.forEach((comment) => {
    commentsFragment.append(makeCommentElement(comment));
  });

  commentsListElement.append(commentsFragment);
  shownCommentsCount += nextComments.length;
  shownCommentsCountElement.textContent = shownCommentsCount;

  commentsLoaderElement.classList.toggle('hidden', shownCommentsCount >= currentComments.length);
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.removeEventListener('click', drawNextComments);
};

function onDocumentKeydown(evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const openBigPicture = ({url, likes, comments, description}) => {
  currentComments = comments;
  shownCommentsCount = 0;
  commentsListElement.innerHTML = '';
  bigPictureImage.src = url;
  bigPictureImage.alt = description;
  likesCountElement.textContent = likes;
  captionElement.textContent = description;
  totalCommentsCountElement.textContent = comments.length;

  drawNextComments();

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.addEventListener('click', drawNextComments);
};

closeButtonElement.addEventListener('click', closeBigPicture);

export {openBigPicture};
