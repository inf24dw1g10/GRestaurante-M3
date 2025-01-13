import { fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider('http://localhost:3000/api', httpClient);

// Personaliza o comportamento do dataProvider
const customDataProvider = {
    ...dataProvider,
    getList: async (resource, params) => {
        const response = await httpClient(`http://localhost:3000/api/${resource}`);
        return {
            data: response.json,
            total: parseInt(response.headers.get('x-total-count') || response.json.length)
        };
    }
};

export default customDataProvider;