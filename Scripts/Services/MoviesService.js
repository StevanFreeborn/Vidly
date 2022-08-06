import { getMoviesErrorMessage } from '../Constants/ErrorMessages.js';

export default class MoviesService {
    endpoint = '/api/movies';

    getMoviesTableData = () => {
        return {
            url: `${this.endpoint}`,
            dataSrc: '',
            error: () => { alert(getMoviesErrorMessage) }
        };
    }

    deleteMovie = async (id) => {
        return await fetch(`${this.endpoint}/${id}`, { method: 'DELETE' });
    }
}