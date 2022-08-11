import { getRentalsErrorMessage } from '../Constants/ErrorMessages.js';
import * as endpoints from '../Constants/ApiEndpoints.js';

export default class RentalsService {
    endpoint = endpoints.RENTALS_ENDPOINT;

    getRentalsTableData = () => {
        return {
            url: this.endpoint,
            dataSrc: '',
            error: () => { toastr.error(getRentalsErrorMessage) }
        };
    }

    createRental = (rentalDto) => {

        var json = JSON.stringify(rentalDto);

        return fetch(this.endpoint, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: json,
        })
    }

    deleteRental = async (id) => {
        const url = endpoints.getDeleteRentalUrl(id);
        return await fetch(url, { method: 'DELETE' });
    }
}