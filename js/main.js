AOS.init();

const elSearchForm = document.querySelector(".films-search-form");
const elSearchInput = elSearchForm.querySelector(".search-input");
const elGenresSelect = document.getElementsByName("genres")[0];
const elSearchBtn = elSearchForm.querySelector(".search-btn");
const elFilmsList = document.querySelector(".films-list");

// Getting modal elements
const elModalFilmTitle = document.querySelector(".finded-film-title");
const elModalFilmImg = document.querySelector(".finded-film-img");
const elModalFilmGenres = document.querySelector(".finded-film-genres");
const elModalFilmOverview = document.querySelector(".finded-film-overview");
const elModalFilmLink = document.querySelector(".finded-film-link");

// Rendering films modal
function renderedFilmsInfo(findedFilm) {
  elModalFilmTitle.textContent = findedFilm.Title;
  elModalFilmImg.src = findedFilm.Poster;
  elModalFilmGenres.textContent = findedFilm.genres.join(", ");
  elModalFilmOverview.textContent = findedFilm.overview;
  elModalFilmLink.href = findedFilm.link;
}

elFilmsList.addEventListener("click", (evt) => {
  if (evt.target.matches(".film-show-btn")) {
    const newFilmsBtnId = evt.target.dataset.id;

    const findFilms = films.find(findedFilm => findedFilm.id === newFilmsBtnId);

    renderedFilmsInfo(findFilms);
  }
})

// Rendering genres
function renderGenres(array, element) {
  const genres = [];
  array.forEach(film => {
    film.genres.forEach(genre => {
      if (!genres.includes(genre)) {
        genres.push(genre);
      }
    })
  })

  if (!genres) {
    return null;
  }

  let newOption = "";
  genres.forEach(item => {
    value = item.split(" ").join("*");
    newOption += `<option value="${value}">${item}</option>`;
  });

  element.innerHTML += newOption;
}
renderGenres(films, elGenresSelect);



// Form submiting
elSearchForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let { search, genres, sorted } = evt.target.elements;

  const elSearchInputValue = elSearchInput.value.trim();

  films.forEach(element => {
    let regexp = new RegExp(elSearchInputValue, "gi");

    let filteredFilms = films.filter(film => film.Title.match(regexp));

    let filteredFilmsGenres = [];
    if (genres.value === "all") {
      filteredFilmsGenres = filteredFilms;
    } else {
      filteredFilmsGenres = filteredFilms.filter(film => film.genres.includes(genres.value));
    }

    if (sorted.value === "a-z") {
      filteredFilmsGenres.sort((a, b) => a.Title.toLowerCase() > b.Title.toLowerCase() ? 1 : -1)
    } else {
      filteredFilmsGenres.sort((a, b) => a.Title.toLowerCase() > b.Title.toLowerCase() ? -1 : 1)
    }

    // console.log(filteredFilmsGenres);
    // renderFilms(filteredFilms, elFilmsList);
    renderFilms(filteredFilmsGenres, elFilmsList)
  });
})

// Rendering films
function renderFilms(array, element) {
  element.innerHTML = null;

  array.forEach(film => {
    // Creating elements
    let newFilmsItem = document.createElement("li");
    let newFilmsImg = document.createElement("img");
    let newFilmsTitle = document.createElement("h3");
    let newFilmsDesc = document.createElement("p");
    let newFilmsBtn = document.createElement("button");

    // Styling elements
    newFilmsItem.style.width = "380px";
    newFilmsItem.style.padding = "15px 0";
    newFilmsItem.classList.add("text-bg-primary");
    newFilmsItem.style.borderRadius = "10px";
    newFilmsImg.style.width = "80%";
    newFilmsImg.style.height = "400px";
    newFilmsImg.style.borderRadius = "10px";
    newFilmsImg.classList.add("d-block");
    newFilmsImg.classList.add("mx-auto");

    // Equalizing films' values
    newFilmsItem.setAttribute("data-aos", "fade-up");
    newFilmsItem.setAttribute("data-aos-duration", "700");
    newFilmsImg.src = film.Poster;
    newFilmsTitle.textContent = film.Title;
    newFilmsDesc.textContent = film.id;
    newFilmsBtn.setAttribute("class", "film-show-btn")
    newFilmsBtn.href = film.link;
    newFilmsBtn.dataset.id = film.id;
    newFilmsBtn.setAttribute("data-bs-toggle", "modal");
    newFilmsBtn.setAttribute("data-bs-target", "#staticBackdrop");
    newFilmsBtn.textContent = "Show more";

    // Puting the elements in the li
    newFilmsItem.appendChild(newFilmsImg);
    newFilmsItem.appendChild(newFilmsTitle);
    newFilmsItem.appendChild(newFilmsDesc);
    newFilmsItem.appendChild(newFilmsBtn);
    element.appendChild(newFilmsItem);
  })
}
// renderFilms(films.slice(0, 200), elFilmsList);
renderFilms(films, elFilmsList);