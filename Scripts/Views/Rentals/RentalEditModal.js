export default function RenderRentalEditModal(id) {
    return `<a role="button" class="m-2" data-bs-toggle="modal" data-bs-target="#rental-edit-modal" data-bs-rental-id="${id}"><i class="fa-solid fa-pencil text-primary"></i></a><span>${id}</span>
            <div class="modal fade edit-rental-modal" id="rental-edit-modal-${id}" tabindex="-1" aria-labelledby="RentalEditModalLabel" aria-hidden="true">

                <div class="modal-dialog modal-dialog-centered">

                    <div class="modal-content">

                        <div class="modal-header">

                            <h5 class="modal-title" id="RentalEditModal">Edit Rental</h5>

                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>

                        <div class="modal-body">

                            <form id="newRental">

                                <div class="mb-3">
                                    <label class="form-label">Customer</label>
                                    <input id="customer" name="customer" type="text" value="" class="form-control" />
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Movie</label>
                                    <input id="movie" name="movie" type="text" value="" class="form-control" />
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Date Rented</label>
                                    <input id="date-rented" name="dateRented" type="text" value="" class="form-control" />
                                </div>

                                <div>
                                
                                </div>

                                <div class="modal-footer">

                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>

                                    <button data-id="${id}" type="submit" class="btn btn-success btn-save" data-bs-dismiss="modal">Save</button>

                                </div>

                        </div>

                    </div>

                </div>

            </div>`
}