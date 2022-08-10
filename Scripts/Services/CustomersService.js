import { getCustomersErrorMessage } from '../Constants/ErrorMessages.js';
import * as endpoints from '../Constants/ApiEndpoints.js';

export default class CustomersService {
    endpoint = endpoints.CUSTOMERS_ENDPOINT;

    getCustomersTableData = () => {
        return {
            url: this.endpoint,
            dataSrc: '',
            error: () => { toastr.error(getCustomersErrorMessage) }
        };
    }

    deleteCustomer = async (id) => {
        const url = endpoints.GetDeleteCustomerUrl(id);
        return await fetch(url, { method: 'DELETE' });
    }
}