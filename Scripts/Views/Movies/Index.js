$(document).ready(() => {

    GetMovies()
        .then(movies => CreateMoviesTable(movies))
        .catch(err => {
            console.log(err);
            alert(getMoviesErrorMessage);
        });

});

const getMoviesErrorMessage = 'Unable to get movies. Please try again.';

const GetMovies = async () => {
    const res = await fetch(`/api/movies`);

    if (!res.ok) return alert(getMoviesErrorMessage);

    return await res.json();
}

const DeleteMovie = async (id) => {
    return await fetch(`/api/movies/${id}`, { method: 'DELETE' });
}

const CreateMoviesTable = (movies) => {
    const table = $('#movies-table').DataTable({
        responsive: true,
        data: movies,
        columns: [
            {
                title: 'Name',
                data: 'name',
                render: (data, type, movie) => {
                    return `<a href="/movies/edit/${movie.id}">${movie.name}</a>`;
                }
            },
            {
                title: 'Genre',
                data: 'genre.name'
            },
            {
                title: 'Delete',
                data: 'id',
                render: (data) => {
                    return `<button type="button" class="btn btn-link p-0" data-bs-toggle="modal" data-bs-target="#delete-modal-${data}">Delete</button>
                                        <div class="modal fade" id="delete-modal-${data}" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">

                                            <div class="modal-dialog modal-dialog-centered">

                                                <div class="modal-content">

                                                    <div class="modal-header">

                                                        <h5 class="modal-title" id="deleteModalLabel">Confirm Deletion</h5>

                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                                                    </div>

                                                    <div class="modal-body">

                                                        <p class="m-0">Are you sure you want to delete this customer?</p>

                                                    </div>

                                                    <div class="modal-footer">

                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>

                                                        <button data-movie-id="${data}" type="button" class="btn btn-danger btn-delete" data-bs-dismiss="modal">Delete</button>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>`
                }

            }
        ]
    });

    $('#movies-table').on('click', '.btn-delete', (e) => {

        const button = $(e.currentTarget);

        const movieId = button.attr('data-movie-id');

        const errorMessage = 'Unable to delete movie. Please try again.'

        DeleteMovie(movieId)
            .then(res => {
                if (!res.ok) return alert(errorMessage);

                table
                    .row(button.parents('tr'))
                    .remove()
                    .draw();
            })
            .catch(err => {
                console.log(err);
                alert(errorMessage)
            });
    });
}