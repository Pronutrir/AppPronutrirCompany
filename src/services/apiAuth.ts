import axios from 'axios';

const ApiAuth = axios.create({
    //teste
    //baseURL: 'http://52.171.215.196:8000/',
    //localhost
    baseURL: 'http://52.171.215.196:9669',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21lIjoiVXNlckBNb2JpbGUjMDExMCIsImlhdCI6MTY1MjAzODQ5MX0.LXtDiagHzSmxKiikCmqbSYVxgMNvAbMm76OEiHn6f4c'
    }
});

export default ApiAuth;
