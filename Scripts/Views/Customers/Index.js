$(document).ready(() => {
    GetCustomers().then(customers => CreateCustomersTable(customers));
});

const GetCustomers = async () => {
    const res = await fetch(`/api/customers`);
    return await res.json();
}

const CreateCustomersTable = (customers) => {
    var table = $("#customers-table").DataTable({
        responsive: true,
        data: customers,
        columns: [
            {
                title: "Name",
                data: "name",
                render: (data, type, customer) => {
                    return `<a href="/customers/edit/${customer.id}">${customer.name}</a>`;
                }
            },
            {
                title: "Membership Type",
                data: "membershipType.name"
            },
            {
                title: "Delete",
                data: "id",
                render: (data) => {
                    return `<button type="button" class="btn btn-link p-0" data-bs-toggle="modal" data-bs-target="#delete-modal-${data}">Delete</button>
                                        <div class="modal fade" id="delete-modal-${data}" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">

                                            <div class="modal-dialog modal-dialog-centered">

                                                <div class="modal-content">

                                                    <div class="modal-header">

                                                        <h5 class="modal-title" id="deleteModalLabel">Confirm Deletion</h5>

                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                                                    </div>

                                                    <div class="modal-body">

                                                        <p class="m-0">Are you sure you want to delete this customer?</p>

                                                    </div>

                                                    <div class="modal-footer">

                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>

                                                        <button data-customer-id="${data}" type="button" class="btn btn-danger btn-delete" data-bs-dismiss="modal">Delete</button>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>`
                }
            }
        ]
    });

    $("#customers-table").on("click", ".btn-delete", (e) => {

        var button = $(e.currentTarget);

        var customerId = button.attr("data-customer-id");

        $.ajax({
            url: `/api/customers/${customerId}`,
            method: "DELETE",
            success: () => {
                table
                    .row(button.parents("tr"))
                    .remove()
                    .draw();
            }
        });
    });
}