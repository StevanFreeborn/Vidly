import { deleteRentalErrorMessage } from '../../Constants/ErrorMessages.js';
import { deleteRentalSuccessMessage } from '../../Constants/SuccessMessages.js';
import RentalsService from '../../Services/RentalsService.js';
const rentalsService = new RentalsService();

$(document).ready(() => {

    const table = CreateRentalsTable();

    $('#edit-rental-modal').on('show.bs.modal', (e) => {
        const button = $(e.relatedTarget);
        const rental = table.row(button.parents('tr')).data();

        $('#rental-id').attr('value', rental.id);
        $('#customer-name').attr('value', rental.customer.name);
        $('#movie-name').attr('value', rental.movie.name);

        const dateRented = new Date(rental.dateRented).toLocaleDateString();

        $('#date-rented').attr('value', dateRented);

        const updatedRental = {
            id: rental.id,
            customerId: rental.customer.id,
            movieId: rental.movie.id,
            dateRented: rental.dateRented,
            dateReturned: null,
        };

        console.log(updatedRental);

        $('#date-returned').on('input', (e) => {
            updatedRental.dateReturned = e.target.value;
        });

        $('#save-button').on('click', (e) => {
            e.preventDefault();

            rentalsService
                .updateRental(updatedRental)
                .then((res) => {
                    if (!res.ok) return toastr.error('Unable to update rental.', null, { closeButton: true });

                    return toastr.success('Rental successfully updated.', null, { closeButton: true });
                })
                .catch((err) => {
                    console.log(err);
                    toastr.error('Unable to update rental.', null, { closeButton: true });
                });

        });

    });

    $('#delete-modal').on('show.bs.modal', (e) => {
        const button = $(e.relatedTarget);

        const rentalId = button.attr('data-bs-rental-id');

        $('#delete-button').on('click', () => {

            rentalsService
                .deleteRental(rentalId)
                .then((res) => {
                    if (!res.ok) return toastr.error(deleteRentalErrorMessage, null, { closeButton: true });

                    toastr.success(deleteRentalSuccessMessage, null, { closeButton: true });

                    table.row(button.parents('tr')).remove().draw(false);
                })
                .catch((err) => {
                    console.log(err);
                    toastr.error(deleteRentalErrorMessage, null, { closeButton: true });
                });
        });
    })

});

const CreateRentalsTable = () => {
    return $('#rentals-table').DataTable({
        order: [[1, 'asc']],
        responsive: {
            details: {
                type: 'column',
            }
        },
        ajax: rentalsService.getRentalsTableData(),
        columns: [
            {

                orderable: false,
                defaultContent: '',
                className: 'dtr-control px-3',
            },
            {
                title: 'Rental Id',
                data: 'id',
                render: (id, type, rental) => {
                    return `<a role="button" class="m-2" data-bs-toggle="modal" data-bs-target="#edit-rental-modal"><i class="fa-solid fa-pencil text-primary"></i></a><span>${id}</span>`
                },
                responsivePriority: 1,
            },
            {
                title: 'Customer',
                data: 'customer.name',
                render: (name, type, rental) => {
                    return `<a href="/customers/edit/${rental.customer.id}" class="m-2"><i class="fa-solid fa-pencil text-primary"></i></a><span>${name}</span>`;
                },
            },
            {
                title: 'Movie',
                data: 'movie.name',
            },
            {
                title: 'Date Rented',
                data: 'dateRented',
                render: (date) => {
                    return new Date(date).toLocaleDateString();
                },
            },
            {
                title: 'Date Returned',
                data: 'dateReturned',
                render: (date) => {
                    if (date == null) return null;
                    return new Date(date).toLocaleDateString();
                },
            },
            {
                title: 'Delete',
                data: 'id',
                render: (id, type, rental) => {
                    return `<button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete-modal" data-bs-rental-id="${id}"><i class="fa-solid fa-trash"></i> Delete</button>`;
                },
                responsivePriority: 2,
            },
        ],
    });
};
