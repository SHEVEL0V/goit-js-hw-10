const infoEl = document.querySelector('.country-info');
const listEl = document.querySelector('.country-list');

export function makeHtmlOneCountry(date) {
  deletHTML();
  const country = date[0];
  const languages = Object.values(country.languages).join(' ');

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

  infoEl.insertAdjacentHTML('beforeend', htmlCards);
}
export function makeHtmlAreyCountry(date) {
  deletHTML();
  const areyHtml = [];
  date.map(country => {
    areyHtml.push(`
      <li>
        <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
        <image href="${country.flags.svg}" height="50" width="50"/>
        </svg>
        <span>${country.name.common}</span>
        </li>`);
  });

  listEl.insertAdjacentHTML('beforeend', areyHtml.join(''));
}

export function deletHTML() {
  listEl.innerHTML = '';
  infoEl.innerHTML = '';
}
