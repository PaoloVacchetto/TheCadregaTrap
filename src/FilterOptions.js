
import { useState } from 'react';

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




export default FilterOptions; 