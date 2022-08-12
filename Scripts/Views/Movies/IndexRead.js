import MoviesService from '../../Services/MoviesService.js';
const moviesService = new MoviesService();

$(document).ready(() => {
    CreateMoviesTable();
});

const CreateMoviesTable = () => {
    $('#movies-table').DataTable({
        order: [[1, 'asc']],
        responsive: {
            details: {
                type: 'column',
            }
        },
        ajax: moviesService.getMoviesTableData(),
        columns: [
            {
                orderable: false,
                defaultContent: '',
                className: 'dtr-control px-3',
            },
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
