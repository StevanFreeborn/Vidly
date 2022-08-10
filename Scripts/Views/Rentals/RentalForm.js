import MoviesService from '../../Services/MoviesService.js';
import CustomersService from '../../Services/CustomersService.js';
import RentalsService from '../../Services/RentalsService.js';
const movieService = new MoviesService();
const customerService = new CustomersService();
const rentalsService = new RentalsService();

$(document).ready(function () {
    let viewModel = {
        customerId: null,
        movieIds: [],
    };

    const customers = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
            url: `${customerService.endpoint}?query=%QUERY`,
            wildcard: '%QUERY',
        }
    });

    const movies = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
            url: `${movieService.endpoint}?query=%QUERY`,
            wildcard: '%QUERY',
        }
    });

    $('#customer').typeahead({
        minLength: 1,
        highlight: true
    }, {
        name: 'customers',
        display: 'name',
        source: customers
    }).on('typeahead:select', (e, customer) => {
        viewModel.customerId = customer.id;
    });

    $('#movie').typeahead({
        minLength: 1,
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

    $.validator.addMethod('validCustomer', () => {
        return viewModel.customerId && vm.customerId !== 0;
    }, 'Please select a valid customer.');

    $("#newRental").validate({
        submitHandler: (form, e) => {
            e.preventDefault();

            rentalsService.createRental(viewModel)
                .then((res) => {
                    if (!res.ok) return toastr.error('Could not create rentals. Please try again.');
                    toastr.success('Rentals successfully recorded.');
                })
                .catch((err) => {
                    console.log(err);
                    toastr.error('Could not create rentals. Please try again.');
                });
        }
    });
})
