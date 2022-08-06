import { getCustomersErrorMessage } from '../Constants/ErrorMessages.js';

export default class CustomersService {
    endpoint = '/api/customers';

    getCustomersTableData = () => {
        return {
            url: `${this.endpoint}`,
            dataSrc: '',
            error: () => { alert(getCustomersErrorMessage) }
        };
    }

    deleteCustomer = async (id) => {
        return await fetch(`${this.endpoint}/${id}`, { method: 'DELETE' });
    }
}