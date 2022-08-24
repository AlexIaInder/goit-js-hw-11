import axios from 'axios';

const API_KEY = '29463489-77d25348d002e70b6c5026d29';
const URL = 'https://pixabay.com/api/';

const params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

export const IMAGES_ON_PAGE_COUNT = 40;

export function fetchImages(searchValue, page = 1) {
  return axios
    .get(URL, {
      params: {
        ...params,
        q: searchValue,
        per_page: IMAGES_ON_PAGE_COUNT,
        page,
      },
    })
    .then(res => res.data);
}
