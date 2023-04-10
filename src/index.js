import './css/styles.css';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector("input#search-box");
inputEl.addEventListener("input", debounce((event) => {
  const nameCountry = event.target.value;
  console.log(nameCountry);
  fetchCountries(nameCountry);
}), DEBOUNCE_DELAY);



// https://restcountries.com/v3.1/name/{name}
// https://restcountries.com/v3.1/name/eesti
// https://restcountries.com/v3.1/name/deutschland

function fetchCountries(name) {
  return fetch("https://restcountries.com/v3.1/name/{name}").then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

// const fetchUsersBtn = document.querySelector(".btn");
// const userList = document.querySelector(".user-list");

// fetchUsersBtn.addEventListener("click", () => {
//   fetchUsers()
//       .then((users) => {
//           console.log("users", users);
//           renderUserList(users)
//       })
//     .catch((error) => console.log(error));
// });

// function fetchUsers() {
//   return fetch("https://jsonplaceholder.typicode.com/users").then(
//     (response) => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     }
//   );
// }

// function renderUserList(users) {
//   const markup = users
//     .map((user) => {
//       return `<li>
//           <p><b>Name</b>: ${user.name}</p>
//           <p><b>Email</b>: ${user.email}</p>
//           <p><b>Company</b>: ${user.company.name}</p>
//           <p><b>Company catchPhrase </b>: ${user.company.catchPhrase}</p>
//           <p><b>Phone</b>: ${user.phone}</p>
//         </li>`;
//     })
//     .join("");
//   userList.innerHTML = markup;
// }
