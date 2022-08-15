import { deleteMovieErrorMessage } from '../../Constants/ErrorMessages.js';
import { deleteMovieSuccessMessage } from '../../Constants/SuccessMessages.js';
import MoviesService from '../../Services/MoviesService.js';
const moviesService = new MoviesService();

$(document).ready(() => {
    const table = CreateMoviesTable();

    $('#delete-modal').on('show.bs.modal', (e) => {
        const button = $(e.relatedTarget);

        const row = table.row(button.parents('tr'));

        const movieId = button.attr('data-bs-movie-id');

        var deleteButton = $('#delete-button').on('click', () => {
            moviesService
                .deleteMovie(movieId)
                .then((res) => {
                    deleteButton.off('click');

                    if (!res.ok) return toastr.error(deleteMovieErrorMessage, null, { closeButton: true });

                    row.remove().draw(false);

                    return toastr.success(deleteMovieSuccessMessage, null, { closeButton: true });
                })
                .catch((err) => {
                    console.log(err);

                    deleteButton.off('click');

                    return toastr.error(deleteMovieErrorMessage, null, { closeButton: true });
                });
        });
    });
});

const CreateMoviesTable = () => {
    return $('#movies-table').DataTable({
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
                render: (data, type, movie) => {
                    return `<a href="/movies/edit/${movie.id}" class="m-2"><i class="fa-solid fa-pencil text-primary"></i></a><span>${movie.name}</span>`;
                },
                responsivePriority: 1,
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
            {
                title: 'Delete',
                data: 'id',
                render: (id, type, rental) => {
                    return `<button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete-modal" data-bs-movie-id="${id}"><i class="fa-solid fa-trash"></i> Delete</button>`;
                },
                responsivePriority: 2,
            },
        ],
    });
};
