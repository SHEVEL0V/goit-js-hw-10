export function fetchCountries(name) {
  const RESTIPI = "https://restcountries.com/v3.1/name/";

  const options = "?fields=name,capital,population,flags,languages";

  return fetch(`${RESTIPI}${name}${options}`).then((response) => {
    return response.json();
  });
}
