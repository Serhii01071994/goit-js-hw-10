import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('select');
const catInfo = document.querySelector('.cat-info');

breedSelect.addEventListener('change', onSelectBreed);

Notiflix.Loading.circle('Loading data, please wait...');

fetchBreeds()
  .then(breeds => {
    Notiflix.Loading.remove();
    breedSelect.classList.remove('hidden');
    breedSelectMarkup(breeds);
    new SlimSelect({
      select: breedSelect,
    });
  })
  .catch(error => {
    FetchError(error);
    Notiflix.Loading.remove();
  });

function breedSelectMarkup(breeds) {
  breedSelect.innerHTML = breeds
    .map(breed => `<option value="${breed.value}">${breed.name}</option>`)
    .join('');
}

function onSelectBreed(e) {
  Notiflix.Loading.circle('Loading data, please wait...');
  const breedId = e.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(cat => {
      renderCatCard(cat);
      Notiflix.Loading.remove();
      catInfo.classList.remove('hidden');
    })
    .catch(error => {
      FetchError(error);
      Notiflix.Loading.remove();
    });
}

function renderCatCard(cat) {
  catInfo.innerHTML = '';
  const html = `<img src="${cat.url}" alt="Cat">
              <div>
          <h2>${cat.breeds[0].name}</h2>
              <p>${cat.breeds[0].description}</p>
              <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
              </div>
            `;
  catInfo.insertAdjacentHTML('beforeend', html);
}

function FetchError(error) {
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
