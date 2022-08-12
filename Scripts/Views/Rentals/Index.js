import RenderDeleteModal from '../Shared/DeleteModal.js';
import { deleteRentalErrorMessage } from '../../Constants/ErrorMessages.js';
import { deleteRentalSuccessMessage } from '../../Constants/SuccessMessages.js';
import RentalsService from '../../Services/RentalsService.js';
const rentalsService = new RentalsService();

$(document).ready(() => {
    console.log('@User.ToString()');
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
                render: (id) => {
                    return `<a href="/rentals/edit/${id}" class="m-2"><i class="fa-solid fa-pencil text-primary"></i></a><span>${id}</span>`;
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
                render: RenderDeleteModal,
                responsivePriority: 2,
            },
        ],
    });

    $('#rentals-table').on('click', '.btn-delete', (e) => {
        const button = $(e.currentTarget);

        const rentalId = button.attr('data-id');

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
};
