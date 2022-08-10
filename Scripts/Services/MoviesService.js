import { getMoviesErrorMessage } from '../Constants/ErrorMessages.js';
import * as endpoints from '../Constants/ApiEndpoints.js';

export default class MoviesService {
    endpoint = endpoints.MOVIES_ENDPOINT;

    getMoviesTableData = () => {
        return {
            url: this.endpoint,
            dataSrc: '',
            error: () => { toastr.error(getMoviesErrorMessage) }
        };
    }

    deleteMovie = async (id) => {
        const url = endpoints.GetDeleteMovieUrl(id);
        return await fetch(url, { method: 'DELETE' });
    }
}