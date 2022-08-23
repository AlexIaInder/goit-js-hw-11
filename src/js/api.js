import axios from 'axios';

const API_KEY = '29463489-77d25348d002e70b6c5026d29';
const URL = 'https://pixabay.com/api/';

const params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

export function getImages(searchValue) {
  return axios
    .get(URL, { params: { ...params, q: searchValue } })
    .then(res => res.data);
}
