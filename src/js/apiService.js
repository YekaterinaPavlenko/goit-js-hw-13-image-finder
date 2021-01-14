const apiKey = '19851067 - 7c860a6e23d51e90a164e5364';
const baseURL = 'https://pixabay.com/api/?';

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    console.log(this.searchQuery);
    const url = `${baseURL}image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${apiKey}`;

    console.log(url);

    return fetch(url)
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(({ hits }) => {
        console.log({ hits });
        this.changePage();
        return hits;
      });
  }

  changePage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
