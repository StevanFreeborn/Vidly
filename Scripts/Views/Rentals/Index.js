import { deleteRentalErrorMessage } from '../../Constants/ErrorMessages.js';
import { deleteRentalSuccessMessage } from '../../Constants/SuccessMessages.js';
import RentalsService from '../../Services/RentalsService.js';
const rentalsService = new RentalsService();

$(document).ready(() => {

    const table = CreateRentalsTable();

    $('#edit-rental-modal').on('show.bs.modal', (e) => {
        const button = $(e.relatedTarget);
        const row = table.row(button.parents('tr'));
        const rental = row.data();

        const updatedRental = { ...rental };

        $('#rental-id').attr('value', rental.id);
        $('#customer-name').attr('value', rental.customer.name);
        $('#movie-name').attr('value', rental.movie.name);

        const dateRented = new Date(rental.dateRented).toLocaleDateString();

        $('#date-rented').attr('value', dateRented);

        if (rental.dateReturned) {
            updatedRental.dateReturned = rental.dateReturned;
            var dateReturned = rental.dateReturned.split('T')[0];
            $('#date-returned').attr('value', dateReturned);
        }

        $('#date-returned').on('input', (e) => {
            console.log(e.target.value);
            if (!e.target.value) {
                return updatedRental.dateReturned = e.target.value;
            }
            return updatedRental.dateReturned = new Date(e.target.value).toISOString().slice(0, -1);
        });

        var saveButton = $('#save-button').on('click', (e) => {
            e.preventDefault();

            rentalsService
                .updateRental(updatedRental)
                .then((res) => {
                    saveButton.off('click');

                    $('#update-rental-form')[0].reset();

                    if (!res.ok) return toastr.error('Unable to update rental.', null, { closeButton: true });

                    rental.dateReturned = updatedRental.dateReturned;

                    table.row(row).data(rental).invalidate();

                    return toastr.success('Rental successfully updated.', null, { closeButton: true });
                })
                .catch((err) => {
                    console.error(err);

                    saveButton.off('click');

                    return toastr.error('Oops something went wrong.', null, { closeButton: true });
                });
        });
    });

    $('#delete-modal').on('show.bs.modal', (e) => {
        const button = $(e.relatedTarget);

        const row = table.row(button.parents('tr'));

        const rentalId = button.attr('data-bs-rental-id');

        var deleteButton = $('#delete-button').on('click', () => {

            rentalsService
                .deleteRental(rentalId)
                .then((res) => {
                    deleteButton.off('click');

                    if (!res.ok) return toastr.error(deleteRentalErrorMessage, null, { closeButton: true });

                    row.remove().draw(false);

                    return toastr.success(deleteRentalSuccessMessage, null, { closeButton: true });


                })
                .catch((err) => {
                    console.error(err);
                    deleteButton.off('click');
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
                    if (!date) return null;
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
