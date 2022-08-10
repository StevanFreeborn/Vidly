import * as endpoints from '../Constants/ApiEndpoints.js';

export default class RentalsService {
    endpoint = endpoints.RENTALS_ENDPOINT;

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
}