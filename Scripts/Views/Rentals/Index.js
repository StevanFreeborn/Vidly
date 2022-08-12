import RenderRentalEditModal from './RentalEditModal.js'
import { deleteRentalErrorMessage } from '../../Constants/ErrorMessages.js';
import { deleteRentalSuccessMessage } from '../../Constants/SuccessMessages.js';
import RentalsService from '../../Services/RentalsService.js';
const rentalsService = new RentalsService();

$(document).ready(() => {
    CreateRentalsTable();
});

const CreateRentalsTable = () => {
    const table = $('#rentals-table').DataTable({
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
                render: RenderRentalEditModal,
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
};
