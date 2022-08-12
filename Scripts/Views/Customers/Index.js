import { deleteCustomerErrorMessage } from '../../Constants/ErrorMessages.js';
import { deleteCustomerSuccessMessage } from '../../Constants/SuccessMessages.js';
import CustomersService from '../../Services/CustomersService.js';
const customersService = new CustomersService();

$(document).ready(() => {
    CreateCustomersTable();
});

const CreateCustomersTable = () => {
    const table = $('#customers-table').DataTable({
        order: [[1, 'asc']],
        responsive: {
            details: {
                type: 'column',
            }
        },
        ajax: customersService.getCustomersTableData(),
        columns: [
            {
                orderable: false,
                defaultContent: '',
                className: 'dtr-control px-3',
            },
            {
                title: 'Name',
                data: 'name',
                render: (data, type, customer) => {
                    return `<a href="/customers/edit/${customer.id}" class="m-2"><i class="fa-solid fa-pencil text-primary"></i></a><span>${customer.name}</span>`;
                },
                responsivePriority: 1,
            },
            {
                title: 'Membership Type',
                data: 'membershipType.name',
            },
            {
                title: 'Delete',
                data: 'id',
                render: (id, type, rental) => {
                    return `<button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete-modal" data-bs-customer-id="${id}"><i class="fa-solid fa-trash"></i> Delete</button>`;
                },
                responsivePriority: 2,
            },
        ],
    });

    $('#delete-modal').on('show.bs.modal', (e) => {
        const button = $(e.relatedTarget);

        const customerId = button.attr('data-bs-customer-id');

        $('#delete-button').on('click', () => {
            customersService
                .deleteCustomer(customerId)
                .then((res) => {
                    if (!res.ok) return toastr.error(deleteCustomerErrorMessage, null, { closeButton: true });

                    toastr.success(deleteCustomerSuccessMessage, null, { closeButton: true })

                    table.row(button.parents('tr')).remove().draw(false);
                })
                .catch((err) => {
                    console.log(err);
                    toastr.error(deleteCustomerErrorMessage, null, { closeButton: true });
                });
        });
    });
};
