import "./css/styles.css";

import Notiflix from "notiflix";
import { fetchCountries } from "./js/fetchCountries";
import debounce from "lodash.debounce";

const DEBOUNCE_DELAY = 300;
const input = document.querySelector("#search-box");
const listEl = document.querySelector(".country-list");
const infoEl = document.querySelector(".country-info");

input.addEventListener(
  "input",
  debounce((e) => {
    inputValue(e);
  }, DEBOUNCE_DELAY)
);

function inputValue(e) {
  const valueInput = e.target.value;
  rendeCauntry(valueInput);
}
function rendeCauntry(valueInput) {
  fetchCountries(valueInput)
    .then((date) => {
      makeCards(date);
      console.log(date);
    })
    .catch(() => {
      console.log("Error");
      deleteHtml();
      makeError();
    });
}

function makeCards(date) {
  if (date.length === 1) {
    makeHtmlOneCountry(date);
  } else if (date.length < 10) {
    makeHtmlArey(date);
  } else {
    deleteHtml();
    makeInfo();
  }
}
function makeHtmlArey(date) {
  const areyHtml = [];
  date.map((country) => {
    areyHtml.push(`<li><svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
    <image href="${country.flags.svg}" height="50" width="50"/></svg><span>${country.name.common}</span></li>`);
  });

  renderHtml(areyHtml.join(""));
}
function makeHtmlOneCountry(date) {
  const country = date.country;
  console.log(country);
  // console.log(`<ul><li><svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
  // <image href="${country.flags.svg}" height="50" width="50"/></svg><span>${country.name.common}</span></li>
  // <li>Capital:${country.capital}</li>
  // <li>Population:${country.population}</li>
  // <li>Languages:</li><ul/>`);
}

function renderHtml(html) {
  listEl.insertAdjacentHTML("beforeend", html);
}
function deleteHtml() {
  listEl.innerHTML = "";
}

function makeInfo() {
  Notiflix.Notify.info(
    "Too many matches found. Please enter a more specific name."
  );
}

function makeError() {
  Notiflix.Notify.failure("Oops, there is no country with that name");
}
