import './styles.css';
import galleryTpl from './tamplates/galleryTpl.hbs';
import ImageApiService from './js/apiService.js';

// API key pixabay: 19851067 - 7c860a6e23d51e90a164e5364;

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  //   loadMore: document.querySelector(''),
};

const imageApiService = new ImageApiService();

refs.searchForm.addEventListener('submit', onSearch);
// refs.loadMore.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();
  //   console.log(event.currentTarget.elements.query.value);
  imageApiService.query = event.currentTarget.elements.query.value;

  if (imageApiService.query === '') {
    return;
  }

  imageApiService.resetPage();
  imageApiService.fetchImages();
  //         .then(hits => {
  //     console.log(hits);
  //     clearGallery();
  //     updateMarcup(hits);
  //   });
}

function updateMarcup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', galleryTpl(hits));
}

function onLoadMore(e) {
  imageApiService.fetchImages().then(hits => updateMarcup(hits));
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
