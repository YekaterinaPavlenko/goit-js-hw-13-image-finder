import './styles.css';
import refs from './js/refs.js';
import notifications from './js/notifications.js';
import galleryTpl from './tamplates/galleryTpl.hbs';
import ImageApiService from './js/apiService.js';
// import modalImage from './js/modal.js';
import LoadMoreBtn from './js/loadMore.js';

// console.log(refs);
const loadMoreBtn = new LoadMoreBtn({
  selector: '.js-load_more',
  hidden: true,
});
// console.log(loadMoreBtn);
const imageApiService = new ImageApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchNewImages);
refs.gallery.addEventListener('load', scrollImages);

function onSearch(event) {
  event.preventDefault();
  //   console.log(event.currentTarget.elements.query.value);
  imageApiService.query = event.currentTarget.elements.query.value;

  if (imageApiService.query.trim() === '') {
    notifications.enterImageName();
    clearGallery();
    loadMoreBtn.hide();
    return;
  }
  loadMoreBtn.show();
  imageApiService.resetPage();
  clearGallery();
  fetchNewImages();
}

function updateMarcup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', galleryTpl(hits));
}

function fetchNewImages() {
  // console.log(document.body.scrollHeight);
  loadMoreBtn.disable();
  imageApiService
    .fetchImages()
    .then(hits => {
      if (hits.length === 0) {
        notifications.notFound();
        loadMoreBtn.hide();
      }
      // console.log(hits);
      loadMoreBtn.enable();
      updateMarcup(hits);
      scrollImages();
      // const modalImg = document.querySelectorAll('img');
      // console.log(modalImg);

      // modalImg.addEventListener('click', modalImage.show());
    })
    .catch(notifications.errorRequest);
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function scrollImages() {
  window.scrollTo({
    top: refs.gallery.scrollHeight,
    behavior: 'smooth',
  });
}
