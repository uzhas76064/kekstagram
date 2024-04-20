const filterRandom = document.getElementById('filter-random');
const filterDefault = document.getElementById('filter-default');
const filterDiscussed = document.getElementById('filter-discussed');

filterDiscussed.addEventListener('click', () => {
  filterDefault.classList.remove('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  filterDiscussed.classList.add('img-filters__button--active');
});

filterRandom.addEventListener('click', () => {
  filterDefault.classList.remove('img-filters__button--active');
  filterRandom.classList.add('img-filters__button--active');
  filterDiscussed.classList.remove('img-filters__button--active');
});

filterDefault.addEventListener('click', () => {
  filterDefault.classList.add('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  filterDiscussed.classList.remove('img-filters__button--active');
});
