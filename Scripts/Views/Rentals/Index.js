import RenderDeleteModal from '../Shared/DeleteModal.js';
import { deleteRentalErrorMessage } from '../../Constants/ErrorMessages.js';
import { deleteRentalSuccessMessage } from '../../Constants/SuccessMessages.js';
import RentalsService from '../../Services/RentalsService.js';
const rentalsService = new RentalsService();

$(document).ready(() => {
    CreateRentalsTable();
});

const CreateRentalsTable = () => {
    const table = $('#rentals-table').DataTable({
        responsive: true,
        ajax: rentalsService.getRentalsTableData(),
        columns: [
            {
                title: 'Rental Id',
                data: 'id',
                render: (id) => {
                    return `<a href="/rentals/edit/${id}">${id}</a>`;
                },
            },
            {
                title: 'Date Rented',
                data: 'dateRented',
                render: (date) => {
                    return new Date(date).toLocaleDateString();
                },
            },
            {
                title: 'Name',
                data: 'customer.name',
                render: (name, type, rental) => {
                    return `<a href="/customers/edit/${rental.customer.id}">${name}</a>`;
                },
            },
            {
                title: 'Movie',
                data: 'movie.name',
            },
            {
                title: 'Delete',
                data: 'id',
                render: RenderDeleteModal,
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
