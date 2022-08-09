$(document).ready(function () {
    let viewModel = {
        customerId: null,
        movieIds: [],
    };

    const customers = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
            url: '/api/customers?query=%QUERY',
            wildcard: '%QUERY',
            cache: false,
        }
    });

    const movies = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
            url: '/api/movies?query=%QUERY',
            wildcard: '%QUERY',
            cache: false,
        }
    });

    $('#customer').typeahead({
        minLength: 3,
        highlight: true
    }, {
        name: 'customers',
        display: 'name',
        source: customers
    }).on('typeahead:select', (e, customer) => {
        viewModel.customerId = customer.id;
    });

    $('#movie').typeahead({
        minLength: 3,
        highlight: true,
    }, {
        name: 'movie',
        display: 'name',
        source: movies,
    }).on('typeahead:select', (e, movie) => {
        if (viewModel.movieIds.indexOf(movie.id) !== -1) return;

        $('#moviesPlaceholder').remove();

        $("#selectedMovies").append(
            `<li id="${movie.id}" class="list-group-item d-flex justify-content-between align-items-center">
                ${movie.name}
                <span>
                    <button data-movie-id=${movie.id} class="btn btn-danger btn-delete">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </span>
             </li>`
        );

        $('#movie').typeahead('val', '');

        viewModel.movieIds.push(movie.id);
    });

    // allow form fields to span width of container.
    $('.twitter-typeahead').attr('style', 'position: relative, display: block');

    $("#selectedMovies").on('click', '.btn-delete', (e) => {
        const button = $(e.currentTarget);

        const movieId = parseInt(button.attr('data-movie-id'));

        const movieIds = viewModel.movieIds;

        const index = movieIds.indexOf(movieId);

        if (index === -1) return;

        movieIds.splice(index, 1);

        button.parents('li').remove();

        if (movieIds.length === 0) $('#selectedMovies').append('<li id="moviesPlaceholder" class="list-group-item">No movies selected.</li>');
    });
})
