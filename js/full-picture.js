import { isEscapeKey } from './util.js';

const COMMENTS_PORTION = 5;

const fullPictureNode = document.querySelector('.big-picture');
const closePictureNode = document.querySelector('#picture-cancel');
const commentsContainerNode = fullPictureNode.querySelector('.social__comments');
const commentNode = fullPictureNode.querySelector('.social__comment');
const commentsLoaderButtonNode = fullPictureNode.querySelector('.comments-loader');
const commentsShownCountNode = fullPictureNode.querySelector('.social__comment-count');

let commentsShown = 0;
let commentsArray = [];

const getCommentsShownInterpolation = () => `
  ${commentsShown} из
  <span class="comments-count">${commentsArray.length} комментариев</span>
  `;

const renderDataOnfullPicture = (container, { url, description, likes }) => {
  const bigPicture = container.querySelector('.big-picture__img img');
  bigPicture.src = url;
  bigPicture.alt = description;
  container.querySelector('.likes-count').textContent = likes;
  container.querySelector('.social__caption').textContent = description;
};

const createComment = ({ avatar, name, message }) => {
  const comment = commentNode.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  commentsShown += COMMENTS_PORTION;

  if (commentsShown >= commentsArray.length) {
    commentsLoaderButtonNode.classList.add('hidden');
    commentsShown = commentsArray.length;
  } else {
    commentsLoaderButtonNode.classList.remove('hidden');
  }

  const commentFragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComment(commentsArray[i]);
    commentFragment.append(commentElement);
  }

  commentsContainerNode.innerHTML = '';
  commentsContainerNode.append(commentFragment);
  commentsShownCountNode.innerHTML = getCommentsShownInterpolation();
};

const openFullPicture = (data) => {
  fullPictureNode.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  renderDataOnfullPicture(fullPictureNode, data);
  commentsArray = data.comments;
  if (commentsArray.length > 0) {
    return renderComments();
  }
  commentsContainerNode.innerHTML = '';
  commentsLoaderButtonNode.classList.add('hidden');
  commentsShownCountNode.innerHTML = getCommentsShownInterpolation();
};

const closeFullPicture = () => {
  fullPictureNode.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsShown = 0;
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPicture();
  }
}

const onExitButtonClick = () => {
  closeFullPicture();
};

const onCommentsLoaderClick = () => {
  renderComments();
};

commentsLoaderButtonNode.addEventListener('click', onCommentsLoaderClick);

closePictureNode.addEventListener('click', onExitButtonClick);

export { openFullPicture };
