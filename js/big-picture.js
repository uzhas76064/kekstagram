import {getRandomPositiveInteger} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const commentCount = document.querySelector('.social__comment-count');
const commentList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');
const cancelButton = document.querySelector('.big-picture__cancel');
const socialFooter = document.querySelector('.social__footer');
const likesCount = bigPicture.querySelector('.likes-count');
const sendCommentButton = socialFooter.querySelector('.social__footer-btn');
const userComment = socialFooter.querySelector('.social__footer-text');

const COMMENTS_PER_PORTION = 5;
const MAX_COMMENT_LENGTH = 140;
let commentsShown = 0;
let comments = [];

const createComment = ({ avatar, name, message }) => {
  const comment = document.createElement('li');
  comment.innerHTML =
    '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  comment.classList.add('social__comment');

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  commentsShown += COMMENTS_PER_PORTION;

  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }

  commentList.innerHTML = '';
  commentList.append(fragment);
  commentCount.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
  commentsShown = 0;
};

function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCancelButtonClick = () => {
  hideBigPicture();
};

const onCommentsLoaderClick = () => renderComments();

const renderPictureDetails = ({ url, likes, description }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  document.addEventListener('keydown', onEscKeyDown);

  renderPictureDetails(data);
  comments = data.comments;
  if (comments.length > 0) {
    renderComments();
  }
};

const onSendComment = () => {
  const comment = userComment.value.trim();
  if (comment.length === 0 || comment.length > MAX_COMMENT_LENGTH) {
    return; // Проверка на пустой или слишком длинный комментарий
  }

  const commenterName = bigPicture.querySelector('.big-picture__img').alt;
  const commenter = {
    'id': getRandomPositiveInteger(600, 5000),
    'avatar': 'img/avatar-6.svg',
    'message': comment,
    'name': commenterName
  };

  comments.unshift(commenter); // Добавление нового комментария в начало списка
  userComment.value = '';

  commentsShown = Math.min(commentsShown + 1, comments.length); // Обновление количества отображаемых комментариев
  renderComments();
};

const onLike = () => {
  let likes = Number(likesCount.textContent);  // Получаем текущее количество лайков как число
  likesCount.classList.toggle('likes-count--active');  // Переключаем класс likes-count--active

  if (likesCount.classList.contains('likes-count--active')) {
    // Если класс likes-count--active присутствует, увеличиваем количество лайков
    likes++;
  } else {
    // Если класс likes-count--active отсутствует, уменьшаем количество лайков
    likes--;
  }

  likesCount.textContent = likes;  // Обновляем текстовое содержимое с новым количеством лайков
};


cancelButton.addEventListener('click', onCancelButtonClick);
commentsLoader.addEventListener('click', onCommentsLoaderClick);
sendCommentButton.addEventListener('click', onSendComment);
likesCount.addEventListener('click', onLike);

export { showBigPicture };
