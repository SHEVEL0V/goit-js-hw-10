import "./css/styles.css";
import { fetchCountries } from "./js/fetchCountries";
import debounce from "lodash.debounce";

const DEBOUNCE_DELAY = 300;
const input = document.querySelector("#search-box");
input.addEventListener("input", inputValue);

function inputValue(e) {
  e.preventDefault();
  const valueInput = e.currentTarget.value;
  rendeCauntry(valueInput);
}

function rendeCauntry(valueInput) {
  fetchCountries(valueInput)
    .then((date) => {
      console.log(date);
    })
    .catch(() => {
      console.log("error");
    });
}
