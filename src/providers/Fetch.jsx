import axios from 'axios';

const Fetch = axios.create({
    baseURL: 'https://localhost:7292/api/',
    timeout: 5000,
});

export default Fetch;