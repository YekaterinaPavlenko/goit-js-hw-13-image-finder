import './styles.css';
import refs from './js/refs.js';
import notifications from './js/notifications.js';
import galleryTpl from './tamplates/galleryTpl.hbs';
import createModalImg from './js/modal.js';
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
      // console.log(imageApiService.page);
      if (hits.length === 0 && imageApiService.page === 2) {
        notifications.notFound();
        loadMoreBtn.hide();
      }
      if (hits.length === 0 && imageApiService.page > 2) {
        notifications.lastImages();
        loadMoreBtn.hide();
      } else if (hits.length > 0 && hits.length < 12) {
        notifications.lastImages();
        updateMarcup(hits);
        scrollImages();
        loadMoreBtn.hide();
      } else {
        loadMoreBtn.enable();
        updateMarcup(hits);
        scrollImages();
      }
      refs.gallery.addEventListener('click', createModalImg);
    })
    .catch(error => {
      notifications.errorRequest;
      loadMoreBtn.hide();
    });
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
