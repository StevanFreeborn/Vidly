import { deleteMovieErrorMessage } from '../../Constants/ErrorMessages.js';
import { deleteMovieSuccessMessage } from '../../Constants/SuccessMessages.js';
import MoviesService from '../../Services/MoviesService.js';
const moviesService = new MoviesService();

$(document).ready(() => {
    CreateMoviesTable();
});

const CreateMoviesTable = () => {
    const table = $('#movies-table').DataTable({
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

    $('#delete-modal').on('show.bs.modal', (e) => {
        const button = $(e.relatedTarget);

        const movieId = button.attr('data-bs-movie-id');

        $('#delete-button').on('click', () => {
            moviesService
                .deleteMovie(movieId)
                .then((res) => {
                    if (!res.ok) return toastr.error(deleteMovieErrorMessage, null, { closeButton: true });

                    toastr.success(deleteMovieSuccessMessage, null, { closeButton: true })

                    table.row(button.parents('tr')).remove().draw(false);
                })
                .catch((err) => {
                    console.log(err);
                    toastr.error(deleteMovieErrorMessage, null, { closeButton: true });
                });
        });

    });
};
