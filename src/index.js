import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.querySelector("input#search-box"),
  countryListEl: document.querySelector(".country-list"),
  countryInfoEl: document.querySelector(".country-info")
}

refs.inputEl.addEventListener("input", debounce(treatmentInput, DEBOUNCE_DELAY));
refs.inputEl.addEventListener("mouseover", () => Notify.info('Please enter few letters from the name of the country you are looking for (if field is empty) or erase field'));

//!=========== All functions for clear build elements ========================

const clearBuildElements = (ref) => (ref.innerHTML = "");

function clearAllElements() {
  clearBuildElements(refs.countryListEl);
  clearBuildElements(refs.countryInfoEl);
};

//!========================== Main function ==================================

function treatmentInput(event) {
  const inputUser = event.target.value.trim();
  console.log("inputUser:", inputUser);


  if (!inputUser) {
    clearAllElements();
    return;
}

  fetchCountries(inputUser)
    .then(data => {
      console.log('data', data)
      if (data.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name');
        return;
      }
      render(data)
    })
    .catch(err => {
      clearAllElements();
      Notify.failure('Oops, there is no country with that name');
  })
};

// !====================== Function for render ==================================

function render(data) {
  if (data.length === 1) {
    clearBuildElements(refs.countryListEl);
    const markupInfoOneCountry = createOneCountry(data);
    refs.countryInfoEl.innerHTML = markupInfoOneCountry;
  } else {
    clearBuildElements(refs.countryInfoEl);
    const markupInfoManyCountry = createManyCountry(data);
    refs.countryListEl.innerHTML = markupInfoManyCountry;

  }
};

// !====================== Function for render 1 country =======================

function createOneCountry(data) {
  return data.map(
    ({ name, capital, population, flags, languages }) =>
      `<img src="${flags.png}" alt="${name.official}" width="200" height="100" >
      <h1>${name.official}</h1>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p>`
  );
};

// !====================== Function for render 2-9 countries =======================

function createManyCountry(data) {
  return data
    .map(
      ({ name, flags }) =>
        `<li><img src="${flags.png}" alt="${name.official}" width="80" height="60">${name.official}</li>`
    )
  .join('');

};


