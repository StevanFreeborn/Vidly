export default function RenderDeleteModal(id) {
    return `<button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete-modal-${id}"><i class="fa-solid fa-trash"></i> Delete</button>
            <div class="modal fade" id="delete-modal-${id}" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">

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

                            <button data-id="${id}" type="button" class="btn btn-danger btn-delete" data-bs-dismiss="modal"><i class="fa-solid fa-trash"></i> Delete</button>

                        </div>

                    </div>

                </div>

            </div>`
}