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
        responsive: true,
        ajax: customersService.getCustomersTableData(),
        columns: [
            {
                title: 'Name',
                data: 'name',
                render: (data, type, customer) => {
                    return `<a href="/customers/edit/${customer.id}">${customer.name}</a>`;
                },
            },
            {
                title: 'Membership Type',
                data: 'membershipType.name',
            },
            {
                title: 'Delete',
                data: 'id',
                render: RenderDeleteModal,
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
