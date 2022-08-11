import MoviesService from '../../Services/MoviesService.js';
const moviesService = new MoviesService();

$(document).ready(() => {
    CreateMoviesTable();
});

const CreateMoviesTable = () => {
    $('#movies-table').DataTable({
        responsive: true,
        ajax: moviesService.getMoviesTableData(),
        columns: [
            {
                title: 'Name',
                data: 'name',
            },
            {
                title: 'Genre',
                data: 'genre.name',
            },
            {
                title: 'Number In Stock',
                data: 'numberInStock',
            },
            {
                title: 'Number Available',
                data: 'numberAvailable'
            },
        ],
    });
};
