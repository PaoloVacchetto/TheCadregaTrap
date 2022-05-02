import { Container } from 'react-bootstrap';

function myAside(props) {

    return (
        <Container className="collapse d-md-block col-md-3 col-12 bg-light below-nav" id="left-sidebar">
            <div className="list-group list-group-flush">
                <a href="#" id="filter-all" className="list-group-item list-group-item-action active">All</a>
                <a href="#" id="filter-favorites" className="list-group-item list-group-item-action">Favorites</a>
                <a href="#" id="filter-best" className="list-group-item list-group-item-action">Best Rated</a>
                <a href="#" id="filter-seen-last-month" className="list-group-item list-group-item-action">Seen Last Month</a>
                <a href="#" id="filter-unseen" className="list-group-item list-group-item-action">Unseen</a>
            </div>
        </Container>
    );
}

export default myAside; 