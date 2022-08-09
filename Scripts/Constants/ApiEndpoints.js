export const CUSTOMERS_ENDPOINT = '/api/customers';
export const MOVIES_ENDPOINT = '/api/movies';

export const GetDeleteMovieUrl = (id) => {
    return `${MOVIES_ENDPOINT}/${id}`
}

export const GetDeleteCustomerUrl = (id) => {
    return `${CUSTOMERS_ENDPOINT}/${id}`
}