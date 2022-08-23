import { getImages } from './js/api';

const formElement = document.querySelector('#search-form');
const inputElement = document.querySelector('input[name="searchQuery"]');
const galleryElement = document.querySelector('.gallery');

formElement.addEventListener('submit', async e => {
  e.preventDefault();

  const { hits: images } = await getImages(inputElement.value);

  renderImages(images);
});

function renderImages(images) {
  for (const image of images) {
    const card = document.createElement('div');
    card.classList.add('photo-card');

    card.innerHTML = `
      <img src="" alt="" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
        </p>
        <p class="info-item">
          <b>Views</b>
        </p>
        <p class="info-item">
          <b>Comments</b>
        </p>
        <p class="info-item">
          <b>Downloads</b>
        </p>
      </div>
    `;
    galleryElement.append(card);
  }
}
