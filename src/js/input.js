import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { makeHtmlOneCountry, makeHtmlAreyCountry, deletHTML } from './renderHtml';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');

input.addEventListener(
  'input',
  debounce(e => {
    inputValue(e);
  }, DEBOUNCE_DELAY),
);

function inputValue(e) {
  const valueInput = e.target.value.trim();
  if (valueInput !== '') {
    fechCauntry(valueInput);
  }
}
function fechCauntry(valueInput) {
  fetchCountries(valueInput)
    .then(date => {
      deletHTML();
      makeCards(date);
    })
    .catch(() => {
      console.log('Error');
    });
}

function makeCards(date) {
  if (date.length === 1) {
    makeHtmlOneCountry(date);
  } else if (date.length <= 10) {
    makeHtmlAreyCountry(date);
  } else if (date.length > 10) {
    makeInfo();
  } else {
    makeError();
  }
}

function makeInfo() {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
}

function makeError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
