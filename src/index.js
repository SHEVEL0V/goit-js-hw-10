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
  const valueInput = e.target.value.trim();
  if (valueInput !== "") {
    fechCauntry(valueInput);
  }
}
function fechCauntry(valueInput) {
  fetchCountries(valueInput)
    .then((date) => {
      makeCards(date);
    })
    .catch(() => {
      console.log("Error");
    });
}

function makeCards(date) {
  if (date.length === 1) {
    makeHtmlOneCountry(date);
    deleteHtmlList();
  } else if (date.length <= 10) {
    makeHtmlAreyCountry(date);
    deleteHtmlCards();
  } else if (date.length > 10) {
    makeInfo();
    deleteHtmlList();
    deleteHtmlCards();
  } else {
    deleteHtmlList();
    deleteHtmlCards();
    makeError();
  }
}
function makeHtmlAreyCountry(date) {
  const areyHtml = [];
  date.map((country) => {
    areyHtml.push(`
    <li>
      <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
      <image href="${country.flags.svg}" height="50" width="50"/>
      </svg>
      <span>${country.name.common}</span>
      </li>`);
  });

  renderHtml(areyHtml.join(""));
}
function makeHtmlOneCountry(date) {
  const country = date[0];
  const languages = Object.values(country.languages).join(" ");

  const htmlCards = `
  <ul>
    <li>
      <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
      <image href="${country.flags.svg}" height="50" width="50"/>
      </svg>
      <span class="header" >${country.name.common}</span>
    </li>
    <li class="bold-text">Capital:<span class="text"> ${country.capital}</span></li>
    <li class="bold-text">Population:<span class="text"> ${country.population}</span></li>
    <li class="bold-text">Languages: <span class="text"> ${languages}</span></li>
  </ul>`;

  infoEl.insertAdjacentHTML("beforeend", htmlCards);
}

function renderHtml(html) {
  listEl.insertAdjacentHTML("beforeend", html);
}
function deleteHtmlList() {
  listEl.innerHTML = "";
}
function deleteHtmlCards() {
  infoEl.innerHTML = "";
}

function makeInfo() {
  Notiflix.Notify.info(
    "Too many matches found. Please enter a more specific name."
  );
}

function makeError() {
  Notiflix.Notify.failure("Oops, there is no country with that name");
}
