import { Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';


function FilmComponent(props) {
    return (
        <FilmList films={props.films}></FilmList>
    );
}


function FilmList(props) {

    const [films, setFilms] = useState(props.films);
    return (
        <>
            <ul>
                {
                    props.films.map((film) => <Filmli film={film} key={film.Title} />)
                }
            </ul>

        </>
    );
}

function Filmli(props) {
    return (

        <li className='list-group-item'>
            <div className='d-flex w-100 justify-content-between'>
                <FilmAction film={props.film}></FilmAction>
                <FilmData film={props.film}></FilmData>
                <span className="rating text-end col-md-2 col-2">
                    <FilmRating film={props.film}></FilmRating>
                </span>
            </div>

        </li>
    );
}
function FilmAction(props) {
    return (
        <Button variant='danger'>
            <i className='bi bi-trash3'></i>
        </Button>
    );
}
function FilmData(props) {
    return (
        <>
            <p className='favorite text-start col-md-5 col-2'>{props.film.Title}</p>
            <span className="custom-control custom-checkbox col-md-1 col-2">
                <input type="checkbox" className="custom-control-input" id="check-f5" />
                <label className="custom-control-label" >Favorite</label>
            </span>
            <small className="watch-date col-md-3 col-2">{props.film.WatchDate.format('YYYY-MM-DD')}</small>
        </>
    );
}

function FilmStar() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>

    );
}
function FilmStarEmpty() {
    return (
        <svg class="empty-star bi bi-star" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
        </svg>

    );
}
function FilmRating(props) {

    let stars = [];
    for (let i = 0; i < props.film.Ratings; i++) {
        stars[i] = FilmStar();
    }
    for (let i = props.film.Ratings; i < 5; i++) {
        stars[i] = FilmStarEmpty();
    }


    return (stars);
}

function FilterOptions(props) {
    return (
        <>
            <a href="#" id="filter-all" className="list-group-item list-group-item-action active" >All</a>
            <a href="#" id="filter-favorites" className="list-group-item list-group-item-action">Favorites</a>
            <a href="#" id="filter-best" className="list-group-item list-group-item-action">Best Rated</a>
            <a href="#" id="filter-seen-last-month" className="list-group-item list-group-item-action">Seen Last Month</a>
            <a href="#" id="filter-unseen" className="list-group-item list-group-item-action">Unseen</a>
        </>
    );
}


export { FilmComponent, FilterOptions }; 