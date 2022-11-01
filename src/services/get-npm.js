import axios from 'axios';

export default class NpmService {
    static fetchNpmPackages = async () => {
        return axios.get('https://api.npms.io/v2/search?q=reactjs');
    }
}