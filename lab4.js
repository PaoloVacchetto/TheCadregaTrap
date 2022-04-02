'use strict'

function Film(input) {
    if (input.title == undefined || input.id == undefined)
        throw new Error("id and title are mandatory");
    if (input.rating < 1 || input.rating > 5)
        throw new Error("rating must be between 1 and 5");
    this.id = input.id;
    this.title = input.title;
    this.favorites = input.favorites || false;
    this.date = input.date && dayjs(input.date);
    this.rating = input.rating;
}

function FilmLibrary() {
    this.list = [];

    this.addNewFilm = (film) => {
        this.list.push(film);
    }

    //part 2
    this.sortByDate = () => {
        return this.list.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    this.deleteFilm = (id) => {
        const new_list = this.list.filter(function(film) {
          return film.id !== id;
        })
        this.list = new_list;
        
      }

    this.resetWatchedFilms = () =>
        this.list.forEach(film => film.date = undefined);

    this.getRated = () => {
        console.log("***** Films filtered, only the rated ones *****");
        return this.list.filter(film => film.rating != undefined)
            .sort((a, b) => b.rating - a.rating)
    }

    this.getSeenLastMonth = () => {
        const now = dayjs();
        return this.list.filter(film => film.date && now.diff(film.date.format(), 'day') < 30 && now.diff(film.date.format(), 'day') >= 0)
    }

}

const f1 = new Film({ id: 1, title: "pulp fiction", favorites: true, date: dayjs("20220401"), rating: 5 });
const f2 = new Film({ id: 2, title: "django", date: dayjs("20220311"), rating: 2 });
const f3 = new Film({ id: 3, title: "Inglorious basterds", favorites: true, date: dayjs("20220620") });
const f4 = new Film({ id: 4, title: "Kill Bill", date: dayjs("20220425"), rating: 5 });
const f5 = new Film({ id: 5, title: "reservoir dogs", date: dayjs("20201211"), rating: 4 });
const f6 = new Film({ id: 6, title: "titanic" });
const f7 = new Film({ id: 7, title: "The Sixth Sense", rating: 3, favorites: true });

const library = new FilmLibrary();
library.addNewFilm(f1);
library.addNewFilm(f2);
library.addNewFilm(f3);
library.addNewFilm(f4);
library.addNewFilm(f5);
library.addNewFilm(f6);
library.addNewFilm(f7);


//DOM EVENTS
function createFilmElement(film) {
    const newli = document.createElement("li");
    newli.className = "list-group-item";

    newli.innerHTML =

        `<div class="d-flex w-100 justify-content-between">
        <p class="${film.favorites ? "favorite" : " "} text-start col-md-5 col-3" id="${film.id}">${film.title}
            
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash" viewBox="0 0 18 18">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
            
        </p>
        <span class="custom-control custom-checkbox col-md-1 col-3">
          <input type="checkbox" class="custom-control-input" id="check-f${film.id}" ${film.favorites ? "checked" : ""}>
          <label class="custom-control-label" for="check-f${film.id}">Favorite</label>
        </span>
        <small class="watch-date col-md-3 col-3">${film.date ? film.date.format('YYYY-MM-DD') : ""}</small>
        <span class="rating text-end col-md-3 col-3">
           
        </span>
       </div>`;

    return newli;
}

const empty_star = `<svg class="empty-star" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                    </svg>`;
const filled_star = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>`;

function fillStar(film, newli) {
    const stars = newli.querySelector(".rating");
    if (film.rating) {
        for (let i = 0; i < film.rating; i++)
            stars.insertAdjacentHTML("afterbegin", filled_star);
        for (let i = 0; i < (5 - film.rating); i++)
            stars.insertAdjacentHTML("beforeend", empty_star);
    }
    else {
        for (let i = 0; i < 5; i++)
            stars.insertAdjacentHTML("afterbegin", empty_star);
    }
}

const list_films = document.getElementById("list-films");
const filter_title = document.getElementById("filter-title");
const filter_all = document.getElementById("filter-all");
const filter_favorites = document.getElementById("filter-favorites");
const filter_best = document.getElementById("filter-best");
const filter_last = document.getElementById("filter-seen-last-month");

function toggle(new_active) {
    const active = document.querySelector(".active");
    active.classList.remove("active");
    new_active.classList.add("active");
}

function displayFilm() {
    list_films.innerHTML = "";
    filter_title.innerText = "All";
    toggle(filter_all);
    for (let film of library.list) {
        const newli = createFilmElement(film);
        list_films.appendChild(newli);
        fillStar(film, newli);
    }
    trash();
}

function displayFavorites() {
    list_films.innerHTML = "";
    filter_title.innerText = "Favorites";
    toggle(filter_favorites);
    for (let film of library.list) {
        if (film.favorites) {
            const newli = createFilmElement(film);
            list_films.appendChild(newli);
            fillStar(film, newli);
        }
    }
    trash();
}

function displayBest() {
    list_films.innerHTML = "";
    filter_title.innerText = "Best Rated";
    toggle(filter_best);
    for (let film of library.list) {
        if (film.rating == 5) {
            const newli = createFilmElement(film);
            list_films.appendChild(newli);
            fillStar(film, newli);
        }
    }
    trash();
}

function displaySeenLastMonth() {
    list_films.innerHTML = "";
    filter_title.innerText = "Seen Last Month";
    toggle(filter_last);
    for (let film of library.getSeenLastMonth()) {
        const newli = createFilmElement(film);
        list_films.appendChild(newli);
        fillStar(film, newli);
    }
    trash();
}

function trash(){
    const delete_buttons = document.querySelectorAll(".bi-trash");
    for (const button of delete_buttons) {
        button.addEventListener("click", event => {
            if (event.currentTarget === event.target) {
                const to_delete = event.currentTarget.parentNode.getAttribute("id");
                console.log(to_delete);
                library.deleteFilm(parseInt(to_delete));
                console.log(library.list);
                switch(filter_title.innerText){
                    case "All" : displayFilm(); break;
                    case "Favorites" : displayFavorites(); break;
                    case "Best Rated" : displayBest(); break;
                    case "Seen Last Month" : displaySeenLastMonth(); break;
                }
            }
        })
    }
}

window.addEventListener('load', event => {
    displayFilm();

    filter_all.addEventListener("click", displayFilm);

    filter_favorites.addEventListener("click", displayFavorites);

    filter_best.addEventListener("click", displayBest);

    filter_last.addEventListener("click", displaySeenLastMonth);
    
});