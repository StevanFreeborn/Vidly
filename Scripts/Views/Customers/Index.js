import RenderDeleteModal from '../Shared/DeleteModal.js';
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
                render: RenderDeleteModal,
                responsivePriority: 2,
            },
        ],
    });

    $('#customers-table').on('click', '.btn-delete', (e) => {
        const button = $(e.currentTarget);

        const customerId = button.attr('data-id');

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
};
