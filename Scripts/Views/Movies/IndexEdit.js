import RenderDeleteModal from '../Shared/DeleteModal.js';
import { deleteMovieErrorMessage } from '../../Constants/ErrorMessages.js';
import MoviesService from '../../Services/MoviesService.js';
const moviesService = new MoviesService();

$(document).ready(() => {
    CreateMoviesTable();
});

const CreateMoviesTable = () => {
    const table = $('#movies-table').DataTable({
        responsive: true,
        ajax: moviesService.getMoviesTableData(),
        columns: [
            {
                title: 'Name',
                data: 'name',
                render: (data, type, movie) => {
                    return `<a href="/movies/edit/${movie.id}">${movie.name}</a>`;
                },
            },
            {
                title: 'Genre',
                data: 'genre.name',
            },
            {
                title: 'Delete',
                data: 'id',
                render: RenderDeleteModal,
            },
        ],
    });

    $('#movies-table').on('click', '.btn-delete', (e) => {
        const button = $(e.currentTarget);

        const movieId = button.attr('data-id');

        moviesService
            .deleteMovie(movieId)
            .then((res) => {
                if (!res.ok) return toastr.error(deleteMovieErrorMessage);

                table.row(button.parents('tr')).remove().draw();
            })
            .catch((err) => {
                console.log(err);
                toastr.error(deleteMovieErrorMessage);
            });
    });
};
