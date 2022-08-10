import { getCustomersErrorMessage } from '../Constants/ErrorMessages.js';
import * as endpoints from '../Constants/ApiEndpoints.js';

export default class CustomersService {
    endpoint = endpoints.CUSTOMERS_ENDPOINT;

    getCustomersTableData = () => {
        return {
            url: this.endpoint,
            dataSrc: '',
            error: () => { alert(getCustomersErrorMessage) }
        };
    }

    deleteCustomer = async (id) => {
        const url = endpoints.GetDeleteCustomerUrl(id);
        return await fetch(url, { method: 'DELETE' });
    }
}