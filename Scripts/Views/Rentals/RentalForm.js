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
            wildcard: '%QUERY'
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

    const movies = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
            url: '/api/movies?query=%QUERY',
            wildcard: '%QUERY'
        }
    });

    $('#movie').typeahead({
        minLength: 3,
        highlight: true
    }, {
        name: 'movie',
        display: 'name',
        source: movies
    }).on('typeahead:select', (e, movie) => {
        $('#moviesPlaceholder').remove();
        $("#selectedMovies").append(`<li class="list-group-item">${movie.name}</li>`);
        $('#movie').typeahead('val', '');
        viewModel.movieIds.push(movie.id);
    });

    // allow form fields to span width of container.
    $('.twitter-typeahead').attr('style', 'position: relative, display: block');
})
