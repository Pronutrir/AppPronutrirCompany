import axios from 'axios';

const ApiAuth = axios.create({
    //teste
    //baseURL: 'http://52.171.215.196:8000/',
    //localhost
    baseURL: 'http://localhost:8080/',
});

export default ApiAuth;
