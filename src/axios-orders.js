import axios from 'axios';
import config from './environment.json';

const instance = axios.create({
    baseURL: config.url
})

export default instance;
