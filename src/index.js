import Notiflix from 'notiflix';
import { fetchImages, IMAGES_ON_PAGE_COUNT } from './js/api';

const formElement = document.querySelector('#search-form');
const inputElement = document.querySelector('input[name="searchQuery"]');
const galleryElement = document.querySelector('.gallery');
const loadMoreBtn = document.getElementById('load-more');

loadMoreBtn.style.display = 'none';

let page;
let totalPageCount;

const getImages = async () => {
  if (totalPageCount < page && totalPageCount) {
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );

    loadMoreBtn.style.display = 'none';
    return;
  }

  const { hits: images, totalHits } = await fetchImages(
    inputElement.value.trim(''),
    page
  );

  if (totalHits === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );

    loadMoreBtn.style.display = 'none';
    return;
  }

  totalPageCount = Math.ceil(totalHits / IMAGES_ON_PAGE_COUNT);

  loadMoreBtn.style.display = 'block';

  renderImages(images);
};

formElement.addEventListener('submit', async e => {
  e.preventDefault();

  galleryElement.innerHTML = '';
  page = 0;
  totalPageCount = 0;

  await getImages(inputElement.value.trim(''));
  savedValue = inputElement.value.trim('');
});

function renderImages(images) {
  for (const image of images) {
    const card = document.createElement('div');
    card.classList.add('photo-card');

    const {
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = image;

    card.innerHTML = `
      <div class="image" style="background-image: url(${webformatURL})"></div>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          ${likes}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${views}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${downloads}
        </p>
      </div>
    `;
    galleryElement.append(card);
  }
}

loadMoreBtn.addEventListener('click', () => {
  page++;
  getImages();
});
