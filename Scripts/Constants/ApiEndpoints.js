export const CUSTOMERS_ENDPOINT = '/api/customers';
export const MOVIES_ENDPOINT = '/api/movies';
export const RENTALS_ENDPOINT = '/api/rentals';

export const getDeleteMovieUrl = (id) => {
    return `${MOVIES_ENDPOINT}/${id}`;
}

export const getDeleteCustomerUrl = (id) => {
    return `${CUSTOMERS_ENDPOINT}/${id}`;
}

export const getDeleteRentalUrl = (id) => {
    return `${RENTALS_ENDPOINT}/${id}`;
}

export const getUpdateRentalUrl = (id) => {
    return `${RENTALS_ENDPOINT}/${id}`;
}