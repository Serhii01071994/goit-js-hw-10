const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_Q8OkVsJrL3QpLefgU8BOdzGl5Quw4Zxd4qSY9LbuT1hOXIFZw0M5TIslVrKQBtC6';

const options = {
  headers: {
    'x-api-key': API_KEY,
  },
};
export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`, options)
    .then(res => res.json())
    .then(data => data.map(breed => ({ value: breed.id, name: breed.name })))
    .catch(error => console.log(error));
}

export function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}`, options)
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data[0];
    })
    .catch(error => console.log(error));
}

