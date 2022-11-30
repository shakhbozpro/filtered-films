AOS.init();

const elSearchForm = document.querySelector(".films-search-form");
const elSearchInput = elSearchForm.querySelector(".search-input");
const elSearchBtn = elSearchForm.querySelector(".search-btn");
const elFilmsList = document.querySelector(".films-list");

elSearchForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const elSearchInputValue = elSearchInput.value.trim();

  films.forEach(element => {
    let regexp = new RegExp(elSearchInputValue, "gi");

    let filteredFilms = films.filter(film => film.Title.match(regexp));

    renderFilms(filteredFilms, elFilmsList);
  });
})



function renderFilms(array, element) {
  element.innerHTML = null;

  array.forEach(film => {
    // Creating elements
    let newFilmsItem = document.createElement("li");
    let newFilmsImg = document.createElement("img");
    let newFilmsTitle = document.createElement("h3");
    let newFilmsDesc = document.createElement("p");
    let newFilmsLink = document.createElement("a");

    // Styling elements
    newFilmsItem.style.width = "380px";
    newFilmsItem.style.padding = "15px 0";
    newFilmsItem.classList.add("text-bg-primary");
    newFilmsItem.setAttribute("data-aos", "fade-up");
    newFilmsItem.setAttribute("data-aos-duration", "700");
    newFilmsItem.style.borderRadius = "10px";
    newFilmsImg.style.width = "80%";
    newFilmsImg.style.height = "400px";
    newFilmsImg.style.borderRadius = "10px";
    newFilmsImg.classList.add("d-block");
    newFilmsImg.classList.add("mx-auto");
    // newFilmsLink.classList.add("text-warning")

    // Equalizing films' values
    newFilmsImg.src = film.Poster;
    newFilmsTitle.textContent = film.Title;
    newFilmsDesc.textContent = film.id;
    newFilmsLink.href = film.link;
    newFilmsLink.textContent = "Show more";

    // Puting the elements in the li
    newFilmsItem.appendChild(newFilmsImg);
    newFilmsItem.appendChild(newFilmsTitle);
    newFilmsItem.appendChild(newFilmsDesc);
    newFilmsItem.appendChild(newFilmsLink);
    element.appendChild(newFilmsItem);
  })
}
// renderFilms(films.slice(0, 200), elFilmsList);
renderFilms(films, elFilmsList);